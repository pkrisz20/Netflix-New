const { verifyJWT } = require('../JWT');
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
        return cb("Images only!");
    }
}

const changeProfile = (usersRouter, db) => usersRouter.post("/changeprofile", verifyJWT, (req, res) => {
    const fileStorageEngine = multer.diskStorage({
        destination: "./uploads/profiles",
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    });

    const upload = multer({
        storage: fileStorageEngine,
        limits: { fileSize: 4000000 },
        fileFilter: function (req, file, cb) {
            checkFileTpye(file, cb);
        }
    }).single("image");

    upload(req, res, (err) => {
        if (err) {
            res.json({ status: false, message: err });
        }
        else {
            if (req.file == undefined) {
                res.json({ status: false, message: "No file selected!" });
            }
            else {
                // upload to database
                const finalImageName = req.file.filename;
                const sqlQuery = "UPDATE users SET profile_pic = ? WHERE user_id = ?;";
                db.query(sqlQuery, [finalImageName, req.session.user.data[0].user_id], (error, result) => {
                    if (error) {
                        console.log(error);
                        res.json({ status: false, message: "Something went wrong" });
                    }
                    if (result) {
                        res.json({ status: true, message: "Successfully changed your profile picture!" });
                    }
                });
            }
        }
    });
});

exports.changeProfile = changeProfile;