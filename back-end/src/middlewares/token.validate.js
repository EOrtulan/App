const jwt = require('jsonwebtoken');
const fs = require('fs');
const { getUserByEmail } = require('../repository/user.repository');
const ErrorConstructor = require('../helpers/errorConstructor');

const jwtSecretKey = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const authToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(403).json({ message: 'Token required' });

  try {
    const tokenDecoded = jwt.decode(token, jwtSecretKey);

    const user = await getUserByEmail(tokenDecoded.data.email);
  
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.userId = user.id;
    next();
  } catch (err) {
    next(ErrorConstructor(401, 'Invalid token'));
  }
};

module.exports = authToken; 