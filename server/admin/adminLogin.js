const bcrypt = require("bcrypt");
const { createToken, createRefreshToken } = require('../adminVerify');

const adminLogin = (adminRouter, db) => adminRouter.post("/login", (req, res) => {
    const { username, pass } = req.body;
    
    db.query("SELECT * FROM users WHERE (username = ? AND is_admin = ?)", [username, 1], (err, result) => {
        if (err) {
            res.send({ status: false, message: err });
        }

        if (result.length == 0) {
            res.send({ status: false, message: "You don't have admin permission" });
        }

        if (result.length > 0) {
            bcrypt.compare(pass, result[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                }

                if (response) {
                    console.log('creating tokens for admin');
                    const accessToken = createToken(result[0].user_id);
                    const refreshToken = createRefreshToken(result[0].user_id);
                    req.session.admin = {
                        data: result,
                        token: accessToken,
                        refresh: refreshToken
                    };
                    console.log('session for admin created');
                    res.json({ status: true });
                }
                else {
                    res.send({ status: false, message:"Wrong username or password" });
                }
            });
        }

        else {
            res.send({ status: false, message:"Wrong username or password" });
        }
    });
});

exports.adminLogin = adminLogin;