const getMoviesByCategory = (moviesRouter, db) => moviesRouter.get("/getbycategory/:category", (req, res) => {
    
    const category = req.params.category;
    const sqlSelect = "SELECT movies.id, movies.movieName, movies.movieDescription, movies.image, movies.releaseDate, movies.video FROM ((movies INNER JOIN cat_movies ON movies.id = cat_movies.movie_id) INNER JOIN categories ON cat_movies.cat_id = categories.category_id) WHERE categories.category_name = ?;";

    db.query(sqlSelect, category, (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ status: false });
        }

        else if (result == 0) {
            return res.json({ status: false });
        }

        else if (result.length > 0) {
            return res.json({ status: true, result: result });
        }
    });
});

exports.getMoviesByCategory = getMoviesByCategory;