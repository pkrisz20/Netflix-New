const { verifyAdmin } = require('../adminVerify');

const setMessageStatus = (adminRouter, db) => adminRouter.put("/emailstatus", verifyAdmin, (req, res) => {

    const messageID = req.body.messageID;
    const status = req.body.status;
    const sqlUpdate = "UPDATE emails SET is_seen = ? WHERE email_id = ?";

    //set message to seen
    if (status) {
        db.query(sqlUpdate, [1, messageID], (err, result) => {
            if (err) {
                console.log(`Error with status update of message: ${err}`);
                return res.json({ status: false, message: "Something went wrong" });
            }
            if (result) {
                return res.json({ status: true, message: "Message status has been successfully updated" });
            }
            else {
                return res.json({ status: false, message: "Something went wrong" });
            }
        });
    }

    //set message to unread
    else if (!status) {
        db.query(sqlUpdate, [0, messageID], (err, result) => {
            if (err) {
                console.log(`Error with status update of message: ${err}`);
                return res.json({ status: false, message: "Something went wrong" });
            }
            if (result) {
                return res.json({ status: true, message: "Message status has been successfully updated" });
            }
            else {
                return res.json({ status: false, message: "Something went wrong" });
            }
        });
    }
});

exports.setMessageStatus = setMessageStatus;