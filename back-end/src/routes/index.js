const { Router } = require('express');
const loginRoute = require('./login');
const registerRoute = require('./register');
const productRoute = require('./product');

const Routes = Router();

Routes.use('/register', registerRoute);
Routes.use('/login', loginRoute);
Routes.use('/products', productRoute);

module.exports = Routes;