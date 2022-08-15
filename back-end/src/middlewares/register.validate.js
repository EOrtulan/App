const registerSchema = require('../validations/register.schema');
const ErrorConstructor = require('../helpers/errorConstructor');

const registerValidate = (req, _res, next) => {
  const { email, password, name } = req.body;

  const { error } = registerSchema.validate({ email, password, name });

  if (error) next(ErrorConstructor(400, error.message));

  next();
};

module.exports = registerValidate; 