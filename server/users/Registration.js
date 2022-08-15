const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment = require("moment");

function generateSecret() {
    return crypto.randomBytes(4).readUInt32BE(0, true);
}

const Registration = (usersRouter, db) => usersRouter.post("/register", (req, res) => {

    const { email, username, pass,  } = req.body;
    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], (err, resp) => {
        if (err) {
            console.log(err);
        }
        
        if (resp.length > 0) {
            if (resp[0].username == username) {
                return res.json({ status: false, message: "This username is already taken! Please change it!" });
            }
            else if (resp[0].email == email) {
                return res.json({ status: false, message: "This email is already taken! Please change it!" });
            }
        }
        else {
            const secretExpireDate = moment(new Date()).add(15, "minutes").format("YYYY-MM-DD HH:mm:ss");
            const createdSecret = generateSecret();
            salt = parseInt(process.env.SALT_ROUNDS);
            bcrypt.hash(pass, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.json({ status: false, message: "Something went wrong. Try it later..." });
                }

                db.query("INSERT INTO users (email, username, password, code, expiration_date) VALUES (?,?,?,?,?)", [email, username, hash, createdSecret, secretExpireDate], (err, result) => {
                    if (err) {
                        return res.json({ status: false, message: "Something went wrong" });
                    }
                    else if (result) {
                        db.query("SELECT * FROM users WHERE email = ? AND username = ?", [email, username], (err, response) => {
                            if (err) {
                                console.log(`Error in registartion select userID ${err}`);
                                return res.json({ status: false, message: "Something went wrong" });
                            }
                            
                            //if the userID exists
                            else if (response) {
                                var registeredUserID = response[0].user_id;
                                var selectedCode = response[0].code;

                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: process.env.EMAIL_ADDRESS,
                                        pass: process.env.EMAIL_PASSWORD
                                    }
                                });

                                var mailOptions = {
                                    from: process.env.EMAIL_ADDRESS,
                                    to: email,
                                    subject: 'Verify Yourself on Fake Netflix',
                                    html: `
                                    <html>
                                        <head></head>
                                        <body style="position: relative; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif">
                                            <div style="background-color: #00b60b; padding: 40px; text-align: center; color: #fff">
                                                <h1>Account verify</h1>
                                                <div style="height: 5px; background-color: #fff"></div>
                                            </div>
                                            <div style="padding: 50px 0 100px 0; text-align: center;">
                                                <h2>Welcome ${ username }</h2>
                                                <span style="display: inline-block; padding: 15px 20px; font-size: 20px; border: 1px solid #c7c7c7; font-family: 'Courier New', Courier, monospace;">
                                                    Please verify yourself by clicking on the link below!
                                                </span>
                                                <br />
                                                <br />
                                                <span>
                                                    Click here to verify yourself:
                                                    <a href="${process.env.APP_HOST}/verify/?userid=${registeredUserID}&code=${selectedCode}"
                                                    target="_blank" style="color: ##00b60b; text-decoration: none; font-weight: 700;">Verify
                                                    </a>
                                                </span>
                                            </div>
                                            <div style="position: absolute; width: calc(100% - 40px); bottom: 0; background-color: #00b60b; padding: 20px; text-align: center; color: #fff">
                                            netflixfaketest1@gmail.com NoCopyright Ⓒ Fake Netflix
                                            </div>
                                        </body>
                                    </html>`,
                                };
        
                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        console.log(error);
                                        return res.json({ status: false, message: "An error has appeared. Please try later..." });
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        return res.json({ status: true, message: "You have been successfully registered. Check your email and verify yourself! You have 15 minutes for that!" });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
});

exports.Registration = Registration;