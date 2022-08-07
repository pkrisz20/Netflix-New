const getCategories = (moviesRouter, db) => moviesRouter.get("/getcategories", (req, res) => {
    const sqlSelect = "SELECT * FROM categories";

    db.query(sqlSelect, (err, result) => {

        if (err) {
            console.log(err);
            res.json({ message: "Something went wrong..." });
        }

        else if (result.length > 0) {
            res.send(result);
        }

        else if (result === 0) {
            res.json({ message: "No categories in the database!" });
        }
    });
});

exports.getCategories = getCategories;