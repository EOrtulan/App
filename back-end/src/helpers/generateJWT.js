const jwt = require('jsonwebtoken');

const jwtConfig = {
  // expiresIn: '15m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign(
    { data: payload }, 
    process.env.JWT_SECRET || 'hulkEsmaga', 
    jwtConfig,
  );
  return token;
};

module.exports = generateJWT; 