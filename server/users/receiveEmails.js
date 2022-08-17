const nodemailer = require("nodemailer");
const moment = require("moment");

function validEmail(emailData) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailData);
}

function hasWhiteSpace(text) {
    return /\s/.test(text);
}

const receiveEmails = (usersRouter, db) => usersRouter.post("/emails", (req, res) => {
    const { email, subject, fullName, username, message } = req.body;
    var isThereUsername = username ? true : false;

    if (!email || !subject || !fullName || !message) {
        return res.json({ status: false, message: "Each field required!" });
    }

    else if (!validEmail(email)) {
        return res.json({ status: false, message: "Invalid email!" });
    }

    else if (!hasWhiteSpace(fullName)) {
        return res.json({ status: false, message: "The full name is at least two words!" });
    }

    else {
        db.query("INSERT INTO emails (from_email, username, full_name, subject, message, sent_at) VALUES (?,?,?,?,?,?)", [email, username, fullName, subject, message, moment(new Date()).format("YYYY-MM-DD HH:mm:ss")], (err, result) => {
            if (err) {
                console.log(`Error with email sending: ${err}`);
                return res.json({ status: false, message: "Error occured!" });
            }

            else if (result) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                var mailOptions = {
                    from: email,
                    to: process.env.EMAIL_ADDRESS,
                    subject: subject,
                    html: `
                    <html>
                        <head></head>
                        <body style="position: relative; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif">
                            <div style="background-color: #00b60b; padding: 40px; text-align: center; color: #fff">
                                <h1>Message from ${fullName} ${isThereUsername ? 'alias ' + username : ''}</h1>
                                <div style="height: 5px; background-color: #fff"></div>
                            </div>
                            <div style="padding: 50px 0; text-align: left;">
                                <span style="font-size: 16px;">${message}</span>
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
                        return res.json({ status: true, message: "Message was sent to the admins! They are going to contact with you soon! So please watch your emails!" });
                    }
                });
            }
        });
    }
});

exports.receiveEmails = receiveEmails;