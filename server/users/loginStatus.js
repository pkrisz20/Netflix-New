const { verifyJWT } = require('../JWT');

const loginStatus = (usersRouter) => usersRouter.get("/getloginstatus", verifyJWT, (req, res) => {
    return res.json({ loginStatus: true });
});

exports.loginStatus = loginStatus;