const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('twig');

const setHomeRoute = require('./home/home.route');
const setLoginRoute = require('./login/login.route');
const setTaskRoute = require('./tasks/task.route');

const errorHandler = require('./app/middleware/error.middleware.js');

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setHomeRoute(app);
setLoginRoute(app);
setTaskRoute(app);

app.use(errorHandler);

module.exports = app;
