const { verifyJWT } = require('../JWT');

const changeUsername = (usersRouter, db) => usersRouter.put("/changeusername", verifyJWT, (req, res) => {
    const { newUsername } = req.body;
    const sqlQuery = "UPDATE users SET username = ? WHERE user_id = ?;";

    db.query(sqlQuery, [newUsername, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }
        if (result) {
            return res.json({ status: true, message: "Your username was successfully changed" });
        }
    });
});

exports.changeUsername = changeUsername;