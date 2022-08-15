const { Router } = require('express');
const userRouter = require('./login');
const registerRouter = require('./register');
const productRoute = require('./product');
const orderRoute = require('./order');

const Routes = Router();

Routes.use('/login', userRouter);
Routes.use('/register', registerRouter);
Routes.use('/products', productRoute);
Routes.use('/orders', orderRoute);

module.exports = Routes; 