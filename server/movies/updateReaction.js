const { verifyJWT } = require('../JWT');

const updateReaction = (moviesRouter, db) => moviesRouter.put("/updatereaction", verifyJWT, (req, res) => {
    
    const commentId = req.body.comment;
    const reaction = req.body.reaction;
    const update = req.body.update;
    const updateQuery = "UPDATE reactions SET is_liked = ? WHERE user_id = ? AND comment_id = ?;";
    const deleteQuery = "DELETE FROM reactions WHERE user_id = ? AND comment_id = ?;";

    if (!update) {
        db.query(deleteQuery, [req.session.user.data[0].user_id, commentId], (err, result) => {
        
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
            db.query(updateQuery, [1, req.session.user.data[0].user_id, commentId], (err, result) => {
            
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
            db.query(updateQuery, [0, req.session.user.data[0].user_id, commentId], (err, result) => {
            
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

exports.updateReaction = updateReaction;