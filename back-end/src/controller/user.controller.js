const { loginService, register } = require('../services/user.service');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const result = await register(name, email, password);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
  create,
};