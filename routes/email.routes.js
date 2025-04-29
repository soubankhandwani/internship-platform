const express = require('express');
const router = express.Router();
const { sendEnrollmentEmail } = require('../controllers/email.controller');
const requiredRole = require('../middlewares/check-role-handler.middleware');
const validateToken = require('../middlewares/validate-token-handler.middleware');

router.post('/enroll/:courseId', validateToken, requiredRole(['user', 'admin']), sendEnrollmentEmail);

module.exports = router;
