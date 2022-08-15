const { Router } = require('express');
const loginValidate = require('../../middlewares/login.validate');
const userController = require('../../controller/user.controller');

const loginRouter = Router();

loginRouter.post('/', loginValidate, userController.loginController);

module.exports = loginRouter;