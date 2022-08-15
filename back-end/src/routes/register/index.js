const { Router } = require('express');
const registerValidate = require('../../middlewares/register.validate');
const { create } = require('../../controller/user.controller');

const registerRouter = Router();

registerRouter.post('/', registerValidate, create);

module.exports = registerRouter; 