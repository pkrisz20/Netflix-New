const { verifyJWT } = require('../JWT');

const addReaction = (moviesRouter, db) => moviesRouter.post("/addreaction", verifyJWT, (req, res) => {
    
    const commentId = req.body.comment;
    const reaction = req.body.reaction;
    const sql = "INSERT INTO reactions(user_id, comment_id, is_liked) VALUES(?, ?, ?);";

    if (reaction) {
        db.query(sql, [req.session.user.data[0].user_id, commentId, 1], (err, result) => {
            
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
        db.query(sql, [req.session.user.data[0].user_id, commentId, 0], (err, result) => {
            
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

exports.addReaction = addReaction;