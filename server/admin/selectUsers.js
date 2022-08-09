const { verifyAdmin } = require('../adminVerify');

const selectUsers = (adminRouter, db) => adminRouter.get("/getusers", verifyAdmin, (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.json({ status: false, message: err });
        }

        if (result.length > 0) {
            return res.json({ status: true, result: result });
        }

        else {
            return res.json({ status: false, message:"Something went wrong" });
        }
    });
});

exports.selectUsers = selectUsers;