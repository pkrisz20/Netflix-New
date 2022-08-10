const getHeroImages = (moviesRouter, db) => moviesRouter.get("/getheroimages", (req, res) => {
    const sqlSelect = "SELECT id, movieName, image FROM movies ORDER BY RAND() LIMIT 8;";

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, message: err });
        }

        else if (result) {
            return res.json({ status: true, images: result });
        }
    });
});

exports.getHeroImages = getHeroImages;