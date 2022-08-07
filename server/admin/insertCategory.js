const { verifyAdmin } = require('../adminVerify');

const insertCategory = (adminRouter, db) => adminRouter.post("/insertcategory", verifyAdmin, (req, res) => {
    const categoryName = req.body.categoryName;

    const sqlInsert = "INSERT INTO categories (category_name) VALUES (?);";
    db.query(sqlInsert, categoryName, (err, result) => {
        if(err) {
            return res.json({ status: false, message: "Something went wrong..." });
        }
        if(result) {
            return res.json({ status: true, message: "Category has been successfully inserted" });
        }
    });
});

exports.insertCategory = insertCategory;
