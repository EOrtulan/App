const md5 = require('md5');
const { users } = require('../database/models');
const ErrorConstructor = require('../helpers/erroConstructor');
const generateJWT = require('../helpers/generateJWT');

const getUserByEmail = async (email) => {
  const user = await users.findOne({
    where: {
      email,
    },
  });

  return user;
};

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

module.exports = {
  login,
  getUserByEmail,
};
