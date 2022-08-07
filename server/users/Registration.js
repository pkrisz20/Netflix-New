const bcrypt = require("bcrypt");

const Registration = (usersRouter, db) => usersRouter.post("/register", (req, res) => {

    const { email, username, pass,  } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", username, (err, resp) => {
        if (err) {
            console.log(err);
        }
        
        if (resp.length > 0) {
            res.send([false, "This username is already taken!"]);
        }
        else {
            salt = parseInt(process.env.SALT_ROUNDS);
            bcrypt.hash(pass, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }

                db.query("INSERT INTO users (email, username, password, is_admin, profile_pic) VALUES (?,?,?,?,?)", [email, username, hash, 0, null], (err, result) => {
            
                    if (err) {
                        return res.send([false, "Something went wrong"]);
                    }
                    else if (result) {
                        return res.send([true, "You have been successfully registered"]);
                    }
                });
            });
        }
    });
});

exports.Registration = Registration;