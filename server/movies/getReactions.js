const getReactions = (moviesRouter, db) => moviesRouter.get("/getreactions", (req, res) => {

    const sql = "SELECT * FROM reactions";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong. Try later..." });
        }

        if (result.length > 0) {
            return res.json({ status: true, result: result });
        }

        else if (result.length == 0) {
            return res.json({ status: null });
        }
    });
});

exports.getReactions = getReactions;