const { Router } = require('express');
const loginValidate = require('../../middlewares/login.validate');
const { loginController } = require('../../controller/user.controller');

const loginRouter = Router();

loginRouter.post('/', loginValidate, loginController);

module.exports = loginRouter;