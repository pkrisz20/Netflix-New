const getMyList = (moviesRouter, db) => moviesRouter.get("/getmylist", (req, res) => {

    const sql = "SELECT movies.id, movies.movieName, movies.movieDescription, movies.image, movies.video, movies.releaseDate FROM movies INNER JOIN list ON movies.id = list.movie_id WHERE list.user_id = ?;";

    db.query(sql, req.session.user.data[0].user_id, (err, result) => {
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
});

exports.getMyList = getMyList;