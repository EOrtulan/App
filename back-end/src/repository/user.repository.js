const { users } = require('../database/models');

const getUserByEmail = async (email) => {
  const user = await users.findOne({
    where: {
      email,
    },
  });

  return user;
};

const create = async (name, email, password) => {
  const user = await users.create({
    email,
    password,
    name,
  });

  return user;
};

module.exports = {
  getUserByEmail,
  create,
};