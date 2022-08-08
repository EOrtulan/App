const { Router } = require('express');
const loginValidate = require('../../middlewares/login.validate');
const validLogin = require('../../controllers/user.controller');

const userRouter = Router();

userRouter.post('/', loginValidate, validLogin);

module.exports = userRouter;