const crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment = require("moment");

function generateSecret() {
    return crypto.randomBytes(4).readUInt32BE(0, true);
}

const forgotPassword = (usersRouter, db) => usersRouter.post("/forgotpassword", (req, res) => {
    const emailAddress = req.body.email;

    db.query("SELECT * FROM users WHERE email = ?", emailAddress, (err, result) => {
        if (err) {
            console.log("Error with forgot password email sending...");
            return res.json({ status: false, message: err });
        }

        if (result.length > 0) {
            console.log('Creating code...');
            const secretCode = generateSecret();
            const codeExpireDate = moment(new Date()).add(10, "minutes").format("YYYY-MM-DD HH:mm:ss");

            db.query("UPDATE users SET code = ?, expiration_date = ? WHERE email = ?",
            [secretCode, codeExpireDate, emailAddress], (err, response) => {
                if (err) {
                    console.log(err);
                    return res.json({ status: false, message: "Something went wrong. Try later..." });
                }

                else if (response) {
                    db.query("SELECT username, code FROM users WHERE email = ?", emailAddress, (e, resp) => {
                        const username = resp[0].username;
                        const verificationCode = resp[0].code;

                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL_ADDRESS,
                                pass: process.env.EMAIL_PASSWORD
                            }
                        });
    
                        var mailOptions = {
                            from: process.env.EMAIL_ADDRESS,
                            to: emailAddress,
                            subject: 'Reset Password on Fake Netflix',
                            html: `
                            <html>
                                <head></head>
                                <body style="position: relative; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif">
                                    <div style="background-color: #00b60b; padding: 40px; text-align: center; color: #fff">
                                        <h1>Password reset</h1>
                                        <div style="height: 5px; background-color: #fff"></div>
                                    </div>
                                    <div style="padding: 50px 0 100px 0; text-align: center;">
                                        <h2>Dear ${ username }, your verification code is</h2>
                                        <span style="display: inline-block; padding: 15px 20px; font-size: 20px; border: 1px solid #c7c7c7; font-family: 'Courier New', Courier, monospace;">
                                            <b>${ verificationCode }</b>
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            Click here to reset password:
                                            <a href="${ process.env.APP_HOST }/reset-password"
                                            target="_blank" style="color: ##00b60b; font-weight: 700;">Reset password
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
                                return res.json({ status: false, message: "Email could not sent due to error!" });
                            } else {
                                console.log('Email sent: ' + info.response);
                                return res.json({ status: true, message: "Check your mail! You have 10 minutes, until the code expires!" });
                            }
                        });
                    });
                }
            });
        }

        else if (result.length == 0) {
            res.json({ status: false, message: "There is no registered user with this email" });
        }
    });
});

exports.forgotPassword = forgotPassword;