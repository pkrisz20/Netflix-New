const { verifyAdmin } = require('../adminVerify');

const insertMovie = (adminRouter, db) => adminRouter.post("/insert", verifyAdmin, (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const releaseDate = req.body.releaseDate; 
    const categories = req.body.categories;

    const getInsertedMovieID = "SELECT * FROM movies WHERE movieName = ?;";
    const insertCategories = "INSERT INTO cat_movies (movie_id, cat_id) VALUES(?,?);";
    const sqlQuery = "INSERT INTO movies (movieName, movieDescription, image, video, releaseDate) VALUES(?,?,?,?,?);";

    db.query(sqlQuery, [movieName, movieReview, null, null, releaseDate], (error, result) => {
        if (error) {
            console.log(error);
            return res.json({ status: false, message: "Something went wrong during the first insert" });
        }
        else if (result) {
            db.query(getInsertedMovieID, movieName, (err, response) => {
                if (err) {
                    return res.json({ status: false, message: "cannot get movie ID error" });
                    console.log("cannot get movie ID error");
                }
                else if (response) {
                    const ID = response[0].id;
                    console.log(ID);

                    categories.forEach((category, index) => {
        
                        db.query(insertCategories, [ID, category], (err, resp) => {
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
        return res.json({ status: true, message: "Movie's datas have been inserted successfully" });
    });
});

exports.insertMovie = insertMovie;
