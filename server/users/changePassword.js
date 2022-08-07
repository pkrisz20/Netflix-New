const { verifyJWT } = require('../JWT');
const bcrypt = require("bcrypt");

const changePassword = (usersRouter, db) => usersRouter.put("/changepassword", verifyJWT, (req, res) => {
    const { oldPassword, newPassword, repeatPassword } = req.body;

    db.query("SELECT password FROM users WHERE user_id = ?", req.session.user.data[0].user_id, (error, response) => {
        if (error) {
            console.log(error);
        }
        else if (response.length > 0) {

            bcrypt.compare(oldPassword, response[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                }

                else if (result) {
                    if (newPassword == repeatPassword) {

                        salt = parseInt(process.env.SALT_ROUNDS);
                        bcrypt.hash(newPassword, salt, (hasherror, hash) => {
                            if (hasherror) {
                                console.log(hasherror);
                            }

                            const sqlQuery = "UPDATE users SET password = ? WHERE user_id = ?;";

                            db.query(sqlQuery, [hash, req.session.user.data[0].user_id], (db_err, success) => {
                                if (db_err) {
                                    console.log(db_err);
                                    return res.json({ status: false, message: "Something went wrong" });
                                }
                                if (success) {
                                    return res.send({ status: true, message: "Your password was successfully changed" });
                                }
                            });
                        });
                    }

                    else if (newPassword != repeatPassword) {
                        res.json({ status: false, message: "Passwords don't match" });
                    }
                }

                else if (!result) {
                    res.json({ status: false, message: "The old password is not correct. Did you get hacked?" });
                }
            });
        }

        else {
            res.json({ status: false, message: "Something went wrong" });
        }
    });
});

exports.changePassword = changePassword;