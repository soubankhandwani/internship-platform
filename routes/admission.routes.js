const express = require('express');
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');
const {
  getAdmissions,
  createAdmission,
} = require('../controllers/admission.controller');
const validateAdmission = require('../validations/admission.validation');

const router = express.Router();

router.use(validateToken);

router
  .get('/', requiredRole(['admin']), getAdmissions)
  .post(
    '/',
    requiredRole(['user', 'admin']),
    validateAdmission,
    createAdmission
  );

module.exports = router;
