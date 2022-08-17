const { verifyAdmin } = require('../adminVerify');
const moment = require("moment");

const filterEmailsByDates = (adminRouter, db) => adminRouter.post("/datediff", verifyAdmin, (req, res) => {

    var dateStart = req.body.dateStart;
    var dateEnd = req.body.dateEnd;

    //add +1 day to the date cause otherwise won't calculate correctly
    dateEnd = moment(dateEnd).add(1, "days").format("YYYY-MM-DD");

    db.query("SELECT * FROM emails WHERE sent_at BETWEEN ? AND ?;", [dateStart, dateEnd], (err, result) => {
        if (err) {
            console.log(`Error at date filtering of emails: ${err}`);
            return res.json({ status: false, message: "Something went wrong" });
        }

        if (result.length == 0) {
            return res.json({ status: null, message: "Not found any email between these two dates" });
        }

        else if (result.length > 0) {
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

exports.filterEmailsByDates = filterEmailsByDates;