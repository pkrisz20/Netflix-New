const { verifyAdmin } = require('../adminVerify');

const deleteUser = (adminRouter, db) => adminRouter.delete("/deleteuser/:userID", verifyAdmin, (req, res) => {

    const ID = req.params.userID;
    const sqlDelete = "DELETE FROM users WHERE user_id = ?";

    db.query(sqlDelete, ID, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: false, message: "Something went wrong..." });
        }
        else if (result) {
            res.json({ status: true, message: "User has been successfully deleted"});
        }
    });
});

exports.deleteUser = deleteUser;