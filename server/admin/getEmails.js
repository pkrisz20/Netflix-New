const { verifyAdmin } = require('../adminVerify');
const moment = require("moment");

const getEmails = (adminRouter, db) => adminRouter.get("/getemails", verifyAdmin, (req, res) => {
    db.query("SELECT * FROM emails", (err, result) => {
        if (err) {
            return res.json({ status: false, message: err });
        }

        if (result.length > 0) {
            result.forEach(item => {
                const formattedTime = moment(item.sent_at).format("YYYY. MMM DD. HH:mm");
                item.sent_at = formattedTime;
            });
            return res.json({ status: true, result: result });
        }

        else {
            return res.json({ status: false, message: "Something went wrong" });
        }
    });
});

exports.getEmails = getEmails;