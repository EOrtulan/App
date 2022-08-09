const md5 = require('md5');
const ErrorConstructor = require('../helpers/erroConstructor');
const generateJWT = require('../helpers/generateJWT');
const { getUserByEmail, create } = require('../repository/user.repository');

const login = async (email, pass) => {
  const user = await getUserByEmail(email);

  if (!user) throw ErrorConstructor(404, 'User not found!');

  if (md5(pass) !== user.password) throw ErrorConstructor(400, 'Invalid email or password');

  const token = generateJWT({ name: user.name, email, role: user.role });

  return {
    token,
    role: user.role,
  };
};

const register = async (name, email, password) => {
  const user = await getUserByEmail(email);

  if (user) throw ErrorConstructor(409, 'Email already exist');

  const passCrypt = md5(password);
  await create(name, email, passCrypt);

  return {
    message: 'Successfully registered',
  };
};

module.exports = { 
  login,
  register,
};
