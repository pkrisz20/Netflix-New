const verifyAccount = (usersRouter, db) => usersRouter.put("/verify/:userID", (req, res) => {
    const verifyID = req.params.userID;

    db.query("UPDATE users SET is_verified = ? WHERE user_id = ?", [1, verifyID], (err, result) => {
        if (err) {
            console.log(`Error in the verification account server part: ${err}`);
            return res.json({ status: false });
        }

        else if (result) {
            return res.json({ status: true });
        }
    });
});

exports.verifyAccount = verifyAccount;