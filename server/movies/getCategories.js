const getCategories = (moviesRouter, db) => moviesRouter.get("/getcategories", (req, res) => {
    const sqlSelect = "SELECT * FROM categories";

    db.query(sqlSelect, (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ message: "Something went wrong..." });
        }

        else if (result.length > 0) {
            return res.json({ result: result });
        }

        else if (result === 0) {
            return res.json({ message: "No categories in the database!" });
        }
    });
});

exports.getCategories = getCategories;