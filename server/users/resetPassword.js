const moment = require("moment");
const bcrypt = require("bcrypt");

const resetPassword = (usersRouter, db) => usersRouter.post("/reset-password", (req, res) => {
    let email = req.body.email;
    let newPassword = req.body.password;
    let code = parseInt(req.body.code);

    db.query("SELECT code, expiration_date FROM users WHERE email = ?", email, (err, result) => {
        
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }
        else if (result.length > 0) {
            const expireDate = moment(result[0].expiration_date, "YYYY-MM-DD HH:mm:ss");
            const dateNow = moment(new Date(), "YYYY-MM-DD HH:mm:ss");

            if (dateNow > expireDate) {
                return res.json({ status: false, message: "Sorry, this code is expired!" });
            }

            if (code !== result[0].code) {
                return res.json({ status: false, message: "Invalid code!" });
            }

            if (code === result[0].code && dateNow < expireDate) {
                newPassword = newPassword.toString();
                salt = parseInt(process.env.SALT_ROUNDS);

                bcrypt.hash(newPassword, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }

                    else {
                        db.query("UPDATE users SET password = ? WHERE email = ?;", [hash, email], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.json({ status: false, message: "Something went wrong during update db" });
                            }
                            else if (result) {
                                return res.json({ status: true, message: "Your password has been updated successfully! Now you can close this window and try to login!" });
                            }
                        });
                    }
                });
            }
        }
    });
});

exports.resetPassword = resetPassword;