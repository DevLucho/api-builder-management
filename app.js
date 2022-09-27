const { appConfig } = require('./config');
const cors = require('cors');
const express = require('express');
const app = express();

// routes api

// setting
app.set('host', appConfig.host);
app.set('port', process.env.PORT || appConfig.port);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// list routes

module.exports = app