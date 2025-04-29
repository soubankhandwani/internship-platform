const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseWithDetails,
  createFullCourseDetails
} = require('../controllers/course.controller');
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router
  .get('/', getCourses)
  .post('/', validateToken, requiredRole(['admin']), upload.single('image'), createCourse);

router.get('/full/:id', getCourseWithDetails);
router.post('/full/:id', validateToken, requiredRole(['admin']), createFullCourseDetails);

router.get('/:id', getCourse)
  .put('/:id', validateToken, requiredRole(['admin']), updateCourse)
  .delete('/:id', validateToken, requiredRole(['admin']), deleteCourse);

module.exports = router;
