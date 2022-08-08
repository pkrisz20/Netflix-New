require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.APP_HOST,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.set("trust proxy", "loopback");

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});

//Cookies - Session
app.use(cookieParser());
app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: true,
        secure: process.env.COOKIE_SECURE
    }
}));

//Routes
const { moviesRouter } = require("./routes/movies");
const { usersRouter } = require("./routes/users");
const { adminRouter } = require("./routes/admin");
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);