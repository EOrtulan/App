const { Router } = require('express');
const userRoute = require('../controllers/user.controller');
const loginValidate = require('../middlewares/login.validate');

const Routes = Router();

Routes.use('/login',loginValidate, userRoute);

module.exports = Routes;