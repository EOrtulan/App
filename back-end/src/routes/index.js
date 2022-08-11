const { Router } = require('express');
const loginRoute = require('./login');
const registerRoute = require('./register');
const productRoute = require('./product');
const orderRoute = require('./order');

const Routes = Router();

Routes.use('/register', registerRoute);
Routes.use('/login', loginRoute);
Routes.use('/products', productRoute);
Routes.use('/orders', orderRoute);

module.exports = Routes;