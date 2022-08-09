const getMovieDetails = (moviesRouter, db) => moviesRouter.get("/getmoviedetails/:movieId", (req, res) => {
    
    const movieID = req.params.movieId;
    const sqlSelect = "SELECT * FROM movies WHERE id = ?";
    const selectCategory = "SELECT category_name FROM categories c JOIN cat_movies cm ON c.category_id = cm.cat_id JOIN movies m ON m.id = cm.movie_id WHERE m.id = ?;";

    db.query(sqlSelect, movieID, (err, result) => {
        if (err) {
            console.log(err);
        }

        else if (result.length > 0) {
            db.query(selectCategory, movieID, (error, response_categories) => {
                if (error) {
                    console.log(error);
                }

                else if (response_categories.length > 0) {
                    return res.json({ movie: result, categories: response_categories });
                }
            });
        }
    });
});

exports.getMovieDetails = getMovieDetails;