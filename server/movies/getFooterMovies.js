const getFooterMovies = (moviesRouter, db) => moviesRouter.get("/footermovies", (req, res) => {

    const basicSQL = "SELECT DISTINCT movies.id, movies.movieName, movies.image FROM movies INNER JOIN likes ON movies.id = likes.movie_id ORDER BY (SELECT SUM(likes.is_liked) FROM likes WHERE likes.is_liked = 1 AND likes.movie_id = movies.id) DESC LIMIT 6;";

    db.query(basicSQL, (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Error with getting FOOTER movies: " + err });
        }

        else if (result) {
            return res.json({ status: true, result: result });
        }
    });
});

exports.getFooterMovies = getFooterMovies;