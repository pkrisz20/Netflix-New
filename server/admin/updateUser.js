const { verifyAdmin } = require('../adminVerify');
const bcrypt = require("bcrypt");

const updateUser = (adminRouter, db) => adminRouter.put("/updateuser", verifyAdmin, (req, res) => {

    const { userID, email, username, password } = req.body;
    const sqlUpdate = "UPDATE users SET email = ?, username = ?, password = ? WHERE user_id = ?";
    salt = parseInt(process.env.SALT_ROUNDS);

    bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
            console.log(error);
            return res.json({ status: false, message: "Something went wrong..." });
        }

        db.query(sqlUpdate, [email, username, hash, userID], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong..." });
            }

            else if (result) {
                return res.json({ status: true, message: "User has been successfully updated" });
            }
        });
    });
});

exports.updateUser = updateUser;