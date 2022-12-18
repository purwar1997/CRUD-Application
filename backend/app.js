require('dotenv').config({ path: './.env' });
require('./config/DBconnection').connect();
const router = require('./routes/routes');
const express = require('express');
const app = express();

// mounting middlewares on root path '/'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

module.exports = app;
