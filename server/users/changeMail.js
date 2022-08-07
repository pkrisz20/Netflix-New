const { verifyJWT } = require('../JWT');

const changeMail = (usersRouter, db) => usersRouter.put("/changemail", verifyJWT, (req, res) => {
    const { newEmail } = req.body;
    const sqlQuery = "UPDATE users SET email = ? WHERE user_id = ?;";

    db.query(sqlQuery, [newEmail, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }
        if (result) {
            return res.send({ status: true, message: "Your email address was successfully changed" });
        }
    });
});

exports.changeMail = changeMail;