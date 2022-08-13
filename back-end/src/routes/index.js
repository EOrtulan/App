const { Router } = require('express');
const loginRoute = require('./login');
const registerRoute = require('./register');

const Routes = Router();

Routes.use('/register', registerRoute);
Routes.use('/login', loginRoute);

module.exports = Routes;