const { Router } = require('express');
const { create } = require('../../controllers/user.controller');
const registerValidate = require('../../middlewares/register.validate');

const registerRouter = Router();

registerRouter.post('/', registerValidate, create);

module.exports = registerRouter;