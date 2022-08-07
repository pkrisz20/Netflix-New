const { verifyAdmin } = require('../adminVerify');

const deleteMovie = (adminRouter, db) => adminRouter.delete("/deletemovie/:movieID", verifyAdmin, (req, res) => {

    const ID = req.params.movieID;
    const sqlDelete = "DELETE FROM movies WHERE id = ?";

    db.query(sqlDelete, ID, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: false, message: "Something went wrong..." });
        }
        else if (result) {
            res.json({ status: true, message: "Movie has been successfully deleted"});
        }
    });
});

exports.deleteMovie = deleteMovie;