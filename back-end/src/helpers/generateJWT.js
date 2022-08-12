const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const secretKey = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign(
    { data: payload }, 
    secretKey || 'hulkEsmaga', 
    jwtConfig,
  );
  return token;
};

module.exports = generateJWT;