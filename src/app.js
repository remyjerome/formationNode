const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('twig');

const setHomeRoute = require('./home/home.route');
const setLoginRoute = require('./login/login.route');

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setHomeRoute(app);
setLoginRoute(app);

module.exports = app;
