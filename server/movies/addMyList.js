const { verifyJWT } = require('../JWT');

const addMyList = (moviesRouter, db) => moviesRouter.post("/addtolist/:movieID", verifyJWT, (req, res) => {
    
    const movieID = req.params.movieID;
    const isAlreadyAdded = "SELECT * FROM list WHERE movie_id = ? AND user_id = ?;";
    const insert = "INSERT INTO list(user_id, movie_id) VALUES(?, ?);";

    db.query(isAlreadyAdded, [movieID, req.session.user.data[0].user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }
        else if (result.length > 0) {
            return res.json({ status: false, message: "This movie is already on your list" });
        }

        else if (result == 0) {
            db.query(insert, [req.session.user.data[0].user_id, movieID], (err, re) => {
        
                if (err) {
                    console.log(err);
                    return res.json({ status: false, message: "Something went wrong. Try later..." });
                }
                else if (re) {
                    return res.json({ status: true, message: "Movie has been added to your list" });
                }
            });
        }
    });
});

exports.addMyList = addMyList;