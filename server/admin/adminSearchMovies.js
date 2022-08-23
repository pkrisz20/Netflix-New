const { verifyAdmin } = require('../adminVerify');

const adminSearchMovies = (adminRouter, db) => adminRouter.post("/filter", verifyAdmin, (req, res) => {

    let { selectedCategories, yearFrom, yearTo } = req.body;
    let basicSQL = `SELECT DISTINCT movies.id, movies.movieName, movies.movieDescription, movies.image, movies.releaseDate, movies.video FROM ((movies INNER JOIN cat_movies ON movies.id = cat_movies.movie_id) INNER JOIN categories ON cat_movies.cat_id = categories.category_id) WHERE `;
    let query = "";

    function joinCategoriesForComplexQuery() {
        selectedCategories.forEach((category, index) => {
            if (index == 0) {
                query = query + `categories.category_name = '${category}'`;
            }
            else {
                query = query + ` OR categories.category_name = '${category}'`;
            }
        });
    }
    
    //if the user sets no dates
    if (yearFrom == null && yearTo == null) {

        selectedCategories.forEach((category, index) => {
            if (index == 0) {
                query = basicSQL + `categories.category_name = '${category}'`;
            }
            else {
                query = query + ` OR categories.category_name = '${category}'`;
            }
        });

        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }

    //if user sets dates
    else if (yearFrom != null && yearTo != null) {

        query = basicSQL + "(movies.releaseDate BETWEEN ? AND ?) AND (";

        joinCategoriesForComplexQuery();
        query = query + ");";

        db.query(query, [yearFrom, yearTo], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    //if only yearfrom is set
    else if (yearFrom != null && yearTo == null) {
        query = basicSQL + "(movies.releaseDate >= ?) AND (";

        joinCategoriesForComplexQuery();
        query = query + ");";

        db.query(query, yearFrom, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    //if only yearto is set
    else if (yearFrom == null && yearTo != null) {
        query = basicSQL + "(movies.releaseDate <= ?) AND (";

        joinCategoriesForComplexQuery();
        query = query + ");";

        db.query(query, yearTo, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    else {
        console.log('Something went wrong');
        return res.json({ status: false });
    }
});

exports.adminSearchMovies = adminSearchMovies;