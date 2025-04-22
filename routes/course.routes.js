const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course.controller');
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');

const router = express.Router();

router.use(validateToken);

router
  .get('/', getCourses)
  .post('/', requiredRole(['admin']), createCourse);

router
  .get('/:id', requiredRole(['user', 'admin']), getCourse)
  .put('/:id', requiredRole(['admin']), updateCourse)
  .delete('/:id', requiredRole(['admin']), deleteCourse);

module.exports = router;
