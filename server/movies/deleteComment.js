const { verifyJWT } = require('../JWT');

const deleteComment = (moviesRouter, db) => moviesRouter.delete("/deletecomment/:commentID", verifyJWT, (req, res) => {

    const commentID = req.params.commentID;
    const sqlDelete = "DELETE FROM comments WHERE comment_id = ?";

    db.query(sqlDelete, commentID, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        } else if (result) {
            return res.json({ status: true, message: "Your comment has been deleted" });
        }
    });
});

exports.deleteComment = deleteComment;