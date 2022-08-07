const { sign, verify } = require('jsonwebtoken');

const createToken = (userID) => {
    const accessToken = sign(
        { id: userID },
        process.env.ACCESS_TOKEN,
        { expiresIn: "60s" }
    );
    return accessToken;
}

const createRefreshToken = (userID) => {
    const refreshToken = sign(
        { id: userID },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1h" }
    );
    return refreshToken;
}

const verifyAdmin = (req, res, next) => {
    try {
        if (!req.session.admin) {
            console.log('session.user is not defined in JWT');
            return res.json({ loginStatus: false });
        }
        else if (req.session.admin) {
            try {
                if (req.session.admin.token) {
                    const accessToken = req.session.admin.token;
                    const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
            
                    if (validToken.id == req.session.admin.data[0].user_id) {
                        console.log("Authenticated by accesstoken");
                        next(); //if the token is valid then execute the request from user
                    }
                }
            }
            catch (err) {
                console.log("Accesstoken is expired. Calling refreshtoken...");
    
                try {
                    if (req.session.admin.refresh) {
                        const refreshToken = req.session.admin.refresh;
                        const validRefreshToken = verify(refreshToken, process.env.REFRESH_TOKEN);
                
                        if (validRefreshToken.id == req.session.admin.data[0].user_id) {
                            console.log("Creating new token...");
                            
                            const newToken = createToken(req.session.admin.data[0].user_id);
                            req.session.admin.token = newToken;
                            const validNewToken = verify(newToken, process.env.ACCESS_TOKEN);
                
                            if (validNewToken) {
                                console.log("Authenticated by the new accesstoken");
                                next();
                            }
                        }
                        else {
                            return res.json({ loginStatus: false });
                        }
                    }
                }
                catch (err) {
                    console.log('Refreshtoken is expired. Pls sign in...');
                    return res.json({ loginStatus: false });
                }
            }
        }
    }
    catch (e) {
        console.log(e);// If there is an error
        return;
    }
}

module.exports = { verifyAdmin, createToken, createRefreshToken };