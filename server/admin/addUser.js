const bcrypt = require("bcrypt");
const { verifyAdmin } = require('../adminVerify');

const addUser = (adminRouter, db) => adminRouter.post("/adduser", verifyAdmin, (req, res) => {

    const { email, username, password, isAdmin, isVerified } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", username, (err, resp) => {
        if (err) {
            console.log(err);
        }
        
        if (resp.length > 0) {
            return res.json({ status: false, message: "This username is already taken!" });
        }
        else {
            salt = parseInt(process.env.SALT_ROUNDS);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }

                db.query("INSERT INTO users (email, username, password, is_admin, is_verified) VALUES (?,?,?,?,?)", [email, username, hash, isAdmin, isVerified], (err, result) => {
            
                    if (err) {
                        return res.json({status: false, message: "Something went wrong" });
                    }
                    else if (result) {
                        return res.json({ status: true, message: "User has been successfully added!" });
                    }
                });
            });
        }
    });
});

exports.addUser = addUser;