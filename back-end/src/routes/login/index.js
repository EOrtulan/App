const { Router } = require('express');
const loginValidate = require('../../middlewares/login.validate');
const { validLogin } = require('../../controllers/user.controller');

const loginRouter = Router();

loginRouter.post('/', loginValidate, validLogin);

module.exports = loginRouter;