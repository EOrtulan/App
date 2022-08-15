const { users } = require('../database/models');

const getUserByEmail = async (email) => {
  const user = await users.findOne({
    where: {
      email,
    },
  });

  return user;
};

module.exports = {
  getUserByEmail,
};