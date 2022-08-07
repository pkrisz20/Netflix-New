const { verifyAdmin } = require('../adminVerify');

const setPermission = (adminRouter, db) => adminRouter.put("/setpermission", verifyAdmin, (req, res) => {

    const userID = req.body.userID;
    const permission = req.body.permission;
    const sqlUpdate = "UPDATE users SET is_admin = ? WHERE user_id = ?";

    //give admin permission to the user
    if (permission) {
        db.query(sqlUpdate, [1, userID], (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result) {
                res.json({ status: true, message: "User's status has been successfully updated" });
            }
            else {
                res.json({ status: false, message: "Something went wrong" });
            }
        });
    }

    //remove admin permission from the user
    else if (!permission) {
        db.query(sqlUpdate, [0, userID], (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result) {
                res.json({ status: true, message: "User's status has been successfully updated" });
            }
            else {
                res.json({ status: false, message: "Something went wrong" });
            }
        });
    }
});

exports.setPermission = setPermission;