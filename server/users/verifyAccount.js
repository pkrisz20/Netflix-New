const verifyAccount = (usersRouter, db) => usersRouter.put("/verify/:userID", (req, res) => {
    const verifyID = req.params.userID;

    db.query("SELECT * FROM users WHERE user_id = ?;", verifyID, (error, result) => {
        if (error) {
            console.log(`Error in verify at exists query: ${error}`);
            return res.json({ status: false });
        }
        
        if (result.length == 0) {
            return res.json({ status: false });
        }

        else if (result.length > 0) {

            db.query("UPDATE users SET is_verified = ? WHERE user_id = ?", [1, verifyID], (err, response) => {
                if (err) {
                    console.log(`Error in the verification account server part: ${err}`);
                    return res.json({ status: false });
                }

                else if (response) {
                    return res.json({ status: true });
                }
            });
        }
    });
});

exports.verifyAccount = verifyAccount;