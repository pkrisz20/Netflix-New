const { verifyAdmin } = require('../adminVerify');
const multer = require("multer");
const path = require("path");

function checkVideoTpye(file, cb) {
    const fileTypes = /mp4|avi|amw/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        return cb("Only MP4, AVI or AMW files!");
    }
}

const uploadMovie = (adminRouter, db) => adminRouter.post("/upload/video/:id", verifyAdmin, (req, res) => {
    
    const movieId = req.params.id;
    const fileStorageVideo = multer.diskStorage({
        destination: "./uploads/videos",
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    });
    
    const uploadVideo = multer({
        storage: fileStorageVideo,
        fileFilter: function (req, file, cb) {
            checkVideoTpye(file, cb);
        }
    }).single("video");
    
    uploadVideo(req, res, (error) => {
        if (error) {
            res.json({ status: false, message: error });
        }
        else {
            if (req.file == undefined) {
                res.json({ status: false, message: "No movie selected!" });
            }
            else {
                // upload everything into database
                const finalVideo = req.file.filename;
                console.log(finalVideo);

                const sqlQuery = "UPDATE movies SET video = ? WHERE id = ?;";

                db.query(sqlQuery, [finalVideo, movieId], (error, result) => {
                    if (error) {
                        console.log(error);
                        res.json({ status: false, message: "Something went wrong" });
                    }
                    if (result) {
                        res.json({ status: true, message: "Successfully changed movie's video!" });
                    }
                });
            }
        }
    });
});

exports.uploadMovie = uploadMovie;