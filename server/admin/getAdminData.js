const { verifyAdmin } = require('../adminVerify');

const getAdminData = (adminRouter, db) => adminRouter.get("/getdata", verifyAdmin, (req, res) => {

    if (req.session.admin.data) {
        const sqlSelectUserData = "SELECT user_id, username FROM users WHERE user_id = ? AND is_admin = ?;";

        db.query(sqlSelectUserData, [req.session.admin.data[0].user_id, 1], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false });
            }

            if (result.length > 0) {
                return res.json({ status: true, result: result });
            }
        });
    }

    else if (!req.session.admin.data) {
        res.json({ status: false, message: "Please Mr.Admin sign in" });
    }
});

exports.getAdminData = getAdminData;