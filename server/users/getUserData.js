const { verifyJWT } = require('../JWT');

const getUserData = (usersRouter, db) => usersRouter.get("/getuserdata", verifyJWT, (req, res) => {

    if (req.session.user) {
        const sqlSelectUserData = "SELECT user_id, email, username, profile_pic FROM users WHERE user_id = ? AND is_admin = ?;";

        db.query(sqlSelectUserData, [req.session.user.data[0].user_id, 0], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false });
            }

            if (result.length > 0) {
                return res.json({ status: true, result: result });
            }
        });
    }

    else if (!req.session.user) {
        res.json({ status: false, message: "Please sign in" });
    }
});

exports.getUserData = getUserData;