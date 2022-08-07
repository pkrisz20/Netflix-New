const moment = require("moment");

const getComments = (moviesRouter, db) => moviesRouter.get("/getcomments/:movieID", (req, res) => {
    
    const movieID = req.params.movieID;
    const sql = "SELECT comments.comment_id, comments.user_id, comments.description, comments.movie_id, comments.created_at, comments.modified_at, users.username, users.profile_pic FROM comments, users WHERE comments.movie_id = ? AND comments.user_id = users.user_id ORDER BY comments.created_at ASC;";
    
    db.query(sql, movieID, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }

        if (result.length > 0) {

            result.forEach(item => {
                const formattedTime = moment(item.created_at, "YYYY-MM-DD HH:mm").fromNow();
                item.created_at = formattedTime;
            });
            return res.json({ status: true, result: result });
        }

        else if (result.length == 0) {
            return res.json({ status: null, message: "There is no comment yet!" });
        }
    });
});

exports.getComments = getComments;