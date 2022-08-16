const { db } = require("../db-config");
const { Registration } = require("../users/Registration");
const { Login } = require("../users/Login");
const { Logout } = require("../users/Logout");
const { getUserData } = require("../users/getUserData");
const { changeProfile } = require("../users/changeProfile");
const { changeMail } = require("../users/changeMail");
const { changeUsername } = require("../users/changeUsername");
const { changePassword } = require("../users/changePassword");
const { loginStatus } = require("../users/loginStatus");
const { forgotPassword } = require("../users/forgotPassword");
const { resetPassword } = require("../users/resetPassword");
const { verifyAccount } = require("../users/verifyAccount");
const { receiveEmails } = require("../users/receiveEmails");

const express = require("express");
const usersRouter = express.Router();

loginStatus(usersRouter);
Registration(usersRouter, db);
Login(usersRouter, db);
Logout(usersRouter);
getUserData(usersRouter, db);
changeProfile(usersRouter, db);
changeMail(usersRouter, db);
changeUsername(usersRouter, db);
changePassword(usersRouter, db);
forgotPassword(usersRouter, db);
resetPassword(usersRouter, db);
verifyAccount(usersRouter, db);
receiveEmails(usersRouter, db);

exports.usersRouter = usersRouter;