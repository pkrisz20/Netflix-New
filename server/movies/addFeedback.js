const { verifyJWT } = require('../JWT');

const addFeedback = (moviesRouter, db) => moviesRouter.post("/addfeedback", verifyJWT, (req, res) => {
    
    const movieId = req.body.movie;
    const reaction = req.body.reaction;
    const sql = "INSERT INTO likes(user_id, movie_id, is_liked) VALUES(?, ?, ?);";

    if (reaction) {
        db.query(sql, [req.session.user.data[0].user_id, movieId, 1], (err, result) => {
            
            if (err) {
                console.log(error);
                return res.json({ status: false });
            }
            else if (result) {
                return res.json({ status: true });
            }
        });
    }
    else if (!reaction) {
        db.query(sql, [req.session.user.data[0].user_id, movieId, 0], (err, result) => {
            
            if (err) {
                console.log(error);
                return res.json({ status: false });
            }
            else if (result) {
                return res.json({ status: true });
            }
        });
    }
});

exports.addFeedback = addFeedback;