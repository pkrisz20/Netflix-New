const { verifyJWT } = require('../JWT');

const filterMyList = (moviesRouter, db) => moviesRouter.post("/filter/mylist", verifyJWT, (req, res) => {

    let { selectedCategories, yearFrom, yearTo } = req.body;
    let basicSQL = `SELECT DISTINCT movies.id, movies.movieName, movies.movieDescription, movies.image, movies.releaseDate, movies.video FROM ((movies INNER JOIN cat_movies ON movies.id = cat_movies.movie_id) INNER JOIN categories ON cat_movies.cat_id = categories.category_id) INNER JOIN list ON movies.id = list.movie_id WHERE list.user_id = ? AND `;
    let query = "";
    
    //if the user sets no dates
    if (yearFrom == null && yearTo == null) {

        selectedCategories.forEach((category, index) => {
            if (index == 0) {
                query = basicSQL + "categories.category_name = '" + category + "'";
            }
            else {
                query = query + " OR categories.category_name = '" + category + "'";
            }
        });

        db.query(query, req.session.user.data[0].user_id, (err, result) => {
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

        selectedCategories.forEach((category, index) => {
            if (index == 0) {
                query = basicSQL + "categories.category_name = '" + category + "'";
            }
            else {
                query = query + " OR categories.category_name = '" + category + "'";
            }
        });
        query = query + " AND movies.releaseDate BETWEEN ? AND ?;"

        db.query(query, [req.session.user.data[0].user_id, yearFrom, yearTo], (err, result) => {
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

exports.filterMyList = filterMyList;