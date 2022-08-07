const { verifyAdmin } = require('../adminVerify');

const updateMovie = (adminRouter, db) => adminRouter.put("/update/:id", verifyAdmin, (req, res) => {
    const movieID = req.params.id;
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const releaseDate = req.body.releaseDate; 
    const categories = req.body.categories;

    const sqlUpdate = "UPDATE movies SET movieName = ?, movieDescription = ?, releaseDate = ? WHERE id = ?";
    const deleteCategories = "DELETE FROM cat_movies WHERE movie_id = ?";
    const insertCategories = "INSERT INTO cat_movies (movie_id, cat_id) VALUES(?,?);";

    db.query(sqlUpdate, [movieName, movieReview, releaseDate, movieID], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: false, message: "Error happened" });
        }

        else if (result) {
            console.log("Success updated");

            db.query(deleteCategories, movieID, (error, response) => {
                if (error) {
                    console.log(error);
                    res.json({ status: false, message: "Error happened" });
                }

                else if (response) {
                    categories.forEach((category, index) => {
        
                        db.query(insertCategories, [movieID, category], (err, resp) => {
                            if (err) {
                                console.log(err);
                            }
                            else if (resp) {
                                console.log((index + 1) + " category inserted");
                            }
                        });
                    });
                }
            });
        }
        res.json({ status: true, message: "Movie's datas have been updated successfully" });
    });
});

exports.updateMovie = updateMovie;