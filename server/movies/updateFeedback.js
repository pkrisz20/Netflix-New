const { verifyJWT } = require('../JWT');

const updateFeedback = (moviesRouter, db) => moviesRouter.put("/updatefeedback", verifyJWT, (req, res) => {
    
    const movieId = req.body.movie;
    const reaction = req.body.reaction;
    const update = req.body.update;
    const updateQuery = "UPDATE likes SET is_liked = ? WHERE user_id = ? AND movie_id = ?;";
    const deleteQuery = "DELETE FROM likes WHERE user_id = ? AND movie_id = ?;";

    if (!update) {
        db.query(deleteQuery, [req.session.user.data[0].user_id, movieId], (err, result) => {
        
            if (err) {
                console.log(err);
                return res.json({ status: false });
            }
            else if (result) {
                return res.json({ status: true });
            }
        });
    }

    else if (update) {
        if (reaction === "like") {
            db.query(updateQuery, [1, req.session.user.data[0].user_id, movieId], (err, result) => {
            
                if (err) {
                    console.log(err);
                    return res.json({ status: false });
                }
                else if (result) {
                    return res.json({ status: true });
                }
            });
        }
        else if (reaction === "dislike") {
            db.query(updateQuery, [0, req.session.user.data[0].user_id, movieId], (err, result) => {
            
                if (err) {
                    console.log(err);
                    return res.json({ status: false });
                }
                else if (result) {
                    return res.json({ status: true });
                }
            });
        }
    }
});

exports.updateFeedback = updateFeedback;