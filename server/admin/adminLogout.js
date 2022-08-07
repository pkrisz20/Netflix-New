const adminLogout = (adminRouter) => adminRouter.put("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.clearCookie("user");
    res.json({ status: true });
    res.end();
});

exports.adminLogout = adminLogout;