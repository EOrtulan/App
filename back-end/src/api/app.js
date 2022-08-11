const express = require('express');
const cors = require('cors');
const path = require('path');
const Routes = require('../routes');
const errorHandler = require('../middlewares/error.handler');
const {
    getImagesMiddleware,
    dirname,
} = require('../middlewares/getImagesMiddleware');

const app = express();

app.use(cors());

const dirname = path.join('..', 'assets', 'images', 'public');

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(Routes);

app.use('/images', express.static(`${dirname}`), getImagesMiddleware);

app.use(errorHandler);

module.exports = app;