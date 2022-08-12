const bcrypt = require("bcrypt");
const { createToken, createRefreshToken } = require('../JWT');

const Login = (usersRouter, db) => usersRouter.post("/login", (req, res) => {
    const { username, pass } = req.body;
    db.query("SELECT * FROM users WHERE (username = ? AND is_admin = ? AND is_verified = ?)", [username, 0, 1], (err, result) => {
        if (err) {
            return res.json({ status: false, message: err });
        }

        if (result.length == 0) {
            return res.json({ status: false, message: "If you already registered, make sure you have been verified yourself via email, otherwise you can't log in! Or did you even register?" });
        }

        if (result.length > 0) {
            bcrypt.compare(pass, result[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                }

                if (response) {
                    console.log('creating tokens');
                    const accessToken = createToken(result[0].user_id);
                    const refreshToken = createRefreshToken(result[0].user_id);
                    req.session.user = {
                        data: result,
                        token: accessToken,
                        refresh: refreshToken
                    };
                    console.log('session created');
                    return res.json({ status: true });
                }
                else {
                    return res.json({ status: false, message:"Wrong username or password" });
                }
            });
        }

        else {
            return res.json({ status: false, message:"Wrong username or password" });
        }
    });
});

exports.Login = Login;