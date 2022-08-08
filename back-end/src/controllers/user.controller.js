const { login } = require('../services/user.service');

const validLogin = async (req, res, next) => {
  try {
    const result = await login(req.body.email, req.body.password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = validLogin;
