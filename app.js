const express = require('express');

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser());

//import Routes
const registeruser = require('./routes/userRegistrationRoute');
const loginuser = require('./routes/userLoginRoute');


app.use(registeruser);
app.use(loginuser);

module.exports = app