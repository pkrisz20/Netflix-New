const getEachComment = (moviesRouter, db) => moviesRouter.get("/geteachcomment", (req, res) => {
    const allComments = "SELECT comment_id, movie_id FROM comments";
    
    db.query(allComments, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }

        if (result.length > 0) {
            return res.json({ status: true, result: result });
        }
    });
});

exports.getEachComment = getEachComment;