const { verifyJWT } = require('../JWT');

const addFavourite = (moviesRouter, db) => moviesRouter.post("/addfavourite/:movie", verifyJWT, (req, res) => {
    
    const movieID = req.params.movie;
    const checkFavouriteMovie = "SELECT * FROM favourites WHERE movie_id = ? AND user_id = ?;";
    const sql = "INSERT INTO favourites(user_id, movie_id) VALUES(?, ?);";

    db.query(checkFavouriteMovie, [movieID, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }
        else if (result.length > 0) {
            return res.json({ status: false, message: "This movie is already on your favourites list" });
        }

        else if (result == 0) {
            db.query(sql, [req.session.user.data[0].user_id, movieID], (err, re) => {
        
                if (err) {
                    console.log(err);
                    return res.json({ status: false, message: "Something went wrong. Try later..." });
                }
                else if (re) {
                    return res.json({ status: true, message: "Movie has been added to your favourites" });
                }
            });
        }
    });
});

exports.addFavourite = addFavourite;