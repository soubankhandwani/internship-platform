const express = require('express');

const {
  loginUser,
  registerUser,
  privateTestRoute,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');

const router = express.Router();

router.post('/login', loginUser).post('/register', registerUser);

router.get(
  '/private',
  validateToken,
  requiredRole(['admin']),
  privateTestRoute
);

module.exports = router;
