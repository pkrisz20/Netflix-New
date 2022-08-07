const { verifyAdmin } = require('../adminVerify');

const deleteCategory = (adminRouter, db) => adminRouter.delete("/deletecategory/:categoryID", verifyAdmin, (req, res) => {

    const categoryID = req.params.categoryID;
    const sqlDelete = "DELETE FROM categories WHERE category_id = ?";

    db.query(sqlDelete, categoryID, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: false, message: "Something went wrong..." });
        }
        else if (result) {
            res.json({ status: true, message: "Category has been successfully deleted"});
        }
    });
});

exports.deleteCategory = deleteCategory;