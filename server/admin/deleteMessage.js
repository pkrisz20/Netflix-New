const { verifyAdmin } = require('../adminVerify');

const deleteMessage = (adminRouter, db) => adminRouter.delete("/deleteemail/:messageID", verifyAdmin, (req, res) => {

    const messageID = req.params.messageID;
    const sqlDelete = "DELETE FROM emails WHERE email_id = ?";

    db.query(sqlDelete, messageID, (err, result) => {
        if (err) {
            console.log(`Error with deleting message at admin interface: ${err}`);
            return res.json({ status: false, message: "Something went wrong..." });
        }
        else if (result) {
            return res.json({ status: true, message: "Message has been successfully deleted" });
        }
    });
});

exports.deleteMessage = deleteMessage;