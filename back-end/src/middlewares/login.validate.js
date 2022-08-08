const loginSchema = require('../validations/login.schema');
const ErrorConstructor = require('../helpers/erroConstructor');

const loginValidate = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error?.details[0].type === 'any.required') {
    next(ErrorConstructor(400, error.message));
  }

  if (error?.details[0].type.includes('.base') || error?.details[0].type.includes('.min')) {
    next(ErrorConstructor(422, error.message));
  }

  if (error) next(ErrorConstructor(400, error.message));

  next();
}

module.exports = loginValidate;