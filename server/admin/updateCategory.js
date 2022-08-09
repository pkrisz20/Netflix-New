const { verifyAdmin } = require('../adminVerify');

const updateCategory = (adminRouter, db) => adminRouter.put("/updatecategory", verifyAdmin, (req, res) => {

    const categoryID = req.body.categoryID;
    const newValue = req.body.newValue;
    const sqlUpdate = "UPDATE categories SET category_name = ? WHERE category_id = ?";

    db.query(sqlUpdate, [newValue, categoryID], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            return res.json({ status: true, message: "Category has been successfully updated" });
        }
        else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    });
});

exports.updateCategory = updateCategory;