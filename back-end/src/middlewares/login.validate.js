const loginSchema = require('../validations/login.schema');
const ErrorConstructor = require('../helpers/erroConstructor');

const loginValidate = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) next(ErrorConstructor(400, error.message));

  next();
};

module.exports = loginValidate;