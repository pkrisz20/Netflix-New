const bcrypt = require("bcrypt");
const { createToken, createRefreshToken } = require('../JWT');

const Login = (usersRouter, db) => usersRouter.post("/login", (req, res) => {
    const { username, pass } = req.body;
    db.query("SELECT * FROM users WHERE (username = ? AND is_admin = ?)", [username, 0], (err, result) => {
        if (err) {
            res.send({ status: false, message: err });
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
                    res.send({ status: true });
                }
                else {
                    res.json({ status: false, message:"Wrong username or password" });
                }
            });
        }

        else {
            res.json({ status: false, message:"Wrong username or password" });
        }
    });
});

exports.Login = Login;