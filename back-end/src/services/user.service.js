const md5 = require('md5');
const ErrorConstructor = require('../helpers/errorConstructor');
const generateJWT = require('../helpers/generateJWT');
const userRepository = require('../repository/user.repository');

const loginService = async (email, pass) => {
  const user = await userRepository.getUserByEmail(email);

  if (!user) throw ErrorConstructor(404, 'Invalid email or password');
  if (md5(pass) !== user.password) throw ErrorConstructor(400, 'Invalid email or password');

  const token = generateJWT({ name: user.name, email, role: user.role });

  return {
    token,
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  };
};

const register = async (name, email, password) => {
  const user = await userRepository.getUserByEmail(email);

  if (user) throw ErrorConstructor(409, 'Email already exist');

  const passCrypt = md5(password);
  const result = await userRepository.create(name, email, passCrypt);

  const token = generateJWT({ name, email, role: 'customer' });

  return {
    token,
    id: result.id,
    role: 'customer',
    name: result.name,
    email: result.email,
  };
};

const getSeller = async () => {
  const sellers = await userRepository.getSeller();

  return sellers;
};

module.exports = {
  loginService,
  register,
  getSeller,
};