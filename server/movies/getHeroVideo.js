const getHeroVideo = (moviesRouter, db) => moviesRouter.get("/getherovideo", (req, res) => {
    const sqlSelect = "SELECT id, movieName, video FROM movies WHERE video IS NOT NULL ORDER BY RAND() LIMIT 1";

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: err });
        }

        else if (result) {
            return res.json({ status: true, result: result });
        }
    });
});

exports.getHeroVideo = getHeroVideo;