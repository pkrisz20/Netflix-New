const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodedatabase"
});

exports.db = db;