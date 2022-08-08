const { Router } = require('express');
const loginValidate = require('../../middlewares/login.validate');

const userRouter = Router();

userRouter.post('/', loginValidate, validLogin);

module.exports = userRouter;