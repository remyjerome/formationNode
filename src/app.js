const express = require('express');
require('twig');

const setHomeRoute = require('./home/home.route');

const app = express();

setHomeRoute(app);

module.exports = app;