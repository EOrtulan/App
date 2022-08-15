const { Router } = require('express');
const userRouter = require('./login');
const registerRouter = require('./register');

const Routes = Router();

Routes.use('/login', userRouter);
Routes.use('/register', registerRouter);

module.exports = Routes; 