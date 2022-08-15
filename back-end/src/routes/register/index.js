const { Router } = require('express');
const registerValidate = require('../../middlewares/register.validate');
const userController = require('../../controller/user.controller');

const registerRouter = Router();

registerRouter.post('/', registerValidate, userController.create);

module.exports = registerRouter; 