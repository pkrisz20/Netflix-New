const { verifyAdmin } = require('../adminVerify');

const adminStatus = (adminRouter) => adminRouter.get("/getadminstatus", verifyAdmin, (req, res) => {
    return res.json({ adminStatus: true });
});

exports.adminStatus = adminStatus;