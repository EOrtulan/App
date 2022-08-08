const { Router } = require('express');
const userRoute = require('./userRoute/index');

const Routes = Router();

Routes.use('/login', userRoute);

module.exports = Routes;