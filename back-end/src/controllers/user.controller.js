const {
  login,
} = require('../services/user.service');

const validLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validLogin,
};
