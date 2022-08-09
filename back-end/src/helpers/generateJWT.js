const jwt = require('jsonwebtoken');
const fs = require('fs');

const key = fs.readFileSync('../../jwt.evaluation.key');

const jwtConfig = {
  // expiresIn: '15m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign(
    { data: payload }, 
    key || 'hulkEsmaga', 
    jwtConfig,
  );
  return token;
};

module.exports = generateJWT;