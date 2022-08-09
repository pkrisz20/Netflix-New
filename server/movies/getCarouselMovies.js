const getCarouselMovies = (moviesRouter, db) => moviesRouter.post("/getcarouselmovies", (req, res) => {

    const categories = req.body.categories;
    let basicSQL = "SELECT DISTINCT movies.id, movies.movieName, movies.image FROM ((movies INNER JOIN cat_movies ON movies.id = cat_movies.movie_id) INNER JOIN categories ON cat_movies.cat_id = categories.category_id) WHERE categories.category_name = ?";
    
    categories.forEach((category, index) => {
        if (index > 0) {
            basicSQL = basicSQL + " OR categories.category_name = ?";
        }
    });

    db.query(basicSQL, categories, (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Error with getting movies for carousels: " + err });
        }

        else if (result) {
            return res.json({ status: true, result: result });
        }
    });
});

exports.getCarouselMovies = getCarouselMovies;