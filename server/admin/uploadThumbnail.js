const { verifyAdmin } = require('../adminVerify');
const multer = require("multer");
const path = require("path");

function checkFileTpye(file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        return cb("Images only! (JPEG, JPG, PNG)");
    }
}

const uploadThumbnail = (adminRouter, db) => adminRouter.post("/upload/image/:id", verifyAdmin, (req, res) => {

    const movieId = req.params.id;
    const fileStorageImage = multer.diskStorage({
        destination: "./uploads/movies",
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    });

    const uploadThumbnail = multer({
        storage: fileStorageImage,
        limits: { fileSize: 4000000 },
        fileFilter: function (req, file, cb) {
            checkFileTpye(file, cb);
        }
    }).single("image");

    uploadThumbnail(req, res, (err) => {
        if (err) {
            res.json({ status: false, message: err });
        }
        else {
            if (req.file == undefined) {
                res.json({ status: false, message: "No file selected!" });
            }
            else {
                // upload everything into database
                const finalImageName = req.file.filename;
                console.log(finalImageName);

                const sqlQuery = "UPDATE movies SET image = ? WHERE id = ?;";

                db.query(sqlQuery, [finalImageName, movieId], (error, result) => {
                    if (error) {
                        console.log(error);
                        res.json({ status: false, message: "Something went wrong" });
                    }
                    if (result) {
                        res.json({ status: true, message: "Successfully changed thumbnail image!" });
                    }
                });
            }
        }
    });
});

exports.uploadThumbnail = uploadThumbnail;