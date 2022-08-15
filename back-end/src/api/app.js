const express = require('express');
const cors = require('cors');
const path = require('path');

const Routes = require('../routes');
const errorHandler = require('../middlewares/error.handler');

const imagePath = path.join(__dirname, '../images');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(Routes);

app.use('/images', express.static(imagePath));
app.use(errorHandler);

module.exports = app;