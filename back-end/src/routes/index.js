const { Router } = require('express');
const loginRoute = require('./login');

const Routes = Router();

Routes.use('/login', loginRoute);

module.exports = Routes;