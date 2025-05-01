const express = require('express');

const {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  getInternshipWithDetails,
  createFullInternshipDetails,
} = require('../controllers/internship.controller');
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router
  .get('/', getInternships)
  .post(
    '/',
    validateToken,
    requiredRole(['admin']),
    upload.single('image'),
    createInternship
  );

router
  .get('/full/:id', getInternshipWithDetails)
  .post(
    '/full/:id',
    validateToken,
    requiredRole(['admin']),
    createFullInternshipDetails
  );

router
  .get('/:id', getInternship)
  .put('/:id', validateToken, requiredRole(['admin']), updateInternship)
  .delete('/:id', validateToken, requiredRole(['admin']), deleteInternship);

module.exports = router;
