const { verifyJWT } = require('../JWT');

const deleteFavourite = (moviesRouter, db) => moviesRouter.delete("/removefavourite/:movieID", verifyJWT, (req, res) => {

    const movieID = req.params.movieID;
    const sqlDelete = "DELETE FROM favourites WHERE movie_id = ? AND user_id = ?";

    db.query(sqlDelete, [movieID, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }
        else if (result) {
            return res.json({ status: true, message: "Movie has been removed from the favourites list" });
        }
    });
});

exports.deleteFavourite = deleteFavourite;