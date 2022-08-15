const { Router } = require('express');
const loginValidate = require('../../middlewares/login.validate');
const loginController = require('../../controller/user.controller');

const userRouter = Router();

userRouter.post('/', loginValidate, loginController);

module.exports = userRouter;