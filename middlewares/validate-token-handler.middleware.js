require('express-async-errors');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorised. Kindly login again!');
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(401);
    throw new Error(
      'Authorization header is missing or invalid. Kindly login again!'
    );
  }
};

module.exports = validateToken;
