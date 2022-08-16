const userService = require('../services/user.service');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginService(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const result = await userService.register(name, email, password);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getSeller = async (_req, res, next) => {
  try {
    const result = await userService.getSeller();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
  create,
  getSeller,
};