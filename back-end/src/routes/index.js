const { Router } = require('express');
const loginRoute = require('./login/index');
const registerRoute = require('./register/index');

const Routes = Router();

Routes.use('/register', registerRoute);
Routes.use('/login', loginRoute);

module.exports = Routes;