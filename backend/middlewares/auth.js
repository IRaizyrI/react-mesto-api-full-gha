const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      next(new UnauthorizedError('Authorization required'));
      return;
    }
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Authorization required'));
  }
};

module.exports = auth;
