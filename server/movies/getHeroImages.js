const getHeroImages = (moviesRouter, db) => moviesRouter.get("/getheroimages", (req, res) => {
    const sqlSelect = "SELECT id, movieName, image FROM movies ORDER BY RAND() LIMIT 6;";

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: false, message: err });
        }

        else if (result) {
            res.json({ status: true, images: result });
        }
    });
});

exports.getHeroImages = getHeroImages;