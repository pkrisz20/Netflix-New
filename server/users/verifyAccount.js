const moment = require("moment");

const verifyAccount = (usersRouter, db) => usersRouter.put("/verify", (req, res) => {
    const verifyID = parseInt(req.query.user);
    const code = parseInt(req.query.code);

    db.query("SELECT * FROM users WHERE user_id = ? AND is_verified = ?;", [verifyID, 0], (error, result) => {
        if (error) {
            console.log(`Error in verify at exists query: ${error}`);
            return res.json({ status: false, message: "Sorry, the verification have been failed!" });
        }
        
        if (result.length == 0) {
            return res.json({ status: false, message: "Sorry, the verification have been failed!" });
        }

        else if (result.length > 0) {
            const expireDate = moment(result[0].expiration_date, "YYYY-MM-DD HH:mm:ss");
            const dateNow = moment(new Date(), "YYYY-MM-DD HH:mm:ss");

            if (dateNow > expireDate) {
                return res.json({ status: false, message: "Sorry, but the expiration time is already expired!" });
            }

            if (code !== result[0].code) {
                return res.json({ status: false, message: "Don't try with invalid codes, and don't try to hack our database!" });
            }

            if (code === result[0].code && dateNow < expireDate) {
                db.query("UPDATE users SET is_verified = ? WHERE user_id = ?", [1, verifyID], (err, response) => {
                    if (err) {
                        console.log(`Error in the verification account server part: ${err}`);
                        return res.json({ status: false, message: "Sorry, the verification have been failed!" });
                    }

                    else if (response) {
                        return res.json({ status: true, message: "Thank you to verify yourself! Now you can close this tab and log in!" });
                    }
                });
            }
        }
    });
});

exports.verifyAccount = verifyAccount;