const getLikes = (moviesRouter, db) => moviesRouter.get("/getlikes", (req, res) => {

    const sql = "SELECT * FROM likes";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }

        else if (result.length > 0) {
            return res.json({ status: true, result: result });
        }

        else if (result.length == 0) {
            return res.json({ status: null });
        }
    });
});

exports.getLikes = getLikes;