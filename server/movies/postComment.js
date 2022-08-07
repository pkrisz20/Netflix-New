const { verifyJWT } = require('../JWT');
const moment = require("moment");

const postComment = (moviesRouter, db) => moviesRouter.post("/postcomment", verifyJWT, (req, res) => {
    const comment = req.body.comment;
    const movieId = req.body.movie;
    const sqlQuery = "INSERT INTO comments(user_id, description, movie_id, created_at, modified_at) VALUES(?,?,?,?,?)";
    
    db.query(sqlQuery,
        [
            req.session.user.data[0].user_id,
            comment,
            movieId,
            moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            null
        ], (error, result) => {
        
        if (error) {
            console.log(error);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }

        else if (result) {
            return res.json({ status: true, message: "Your comment has been posted successfully!" });
        }
    });
});

exports.postComment = postComment;