const express = require('express');

const validateCourse = require('../validations/lesson.validation');
const {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} = require('../controllers/lesson.controller');
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');

const router = express.Router();

router.use(validateToken);

router
  .get('/:id', requiredRole(['admin', 'user']), getLessons)
  .put('/:id', requiredRole(['admin']), updateLesson)
  .delete('/:id', requiredRole(['admin']), deleteLesson);

router.post('/', requiredRole(['admin']), validateCourse, createLesson);

module.exports = router;
