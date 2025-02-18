const mongoose = require('mongoose');

const Course = require('../models/course.model');

// @desc List all courses
// @route GET /api/courses
// @access private [user, admin]
const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
};

// @desc Retreive one course
// @route GET /api/courses/:id
// @access private [user, admin]
const getCourse = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for finding a course.');
  }

  const course = await Course.findById(id);
  if (!course) {
    res.status(404);
    throw new Error('No course exists with the given ID.');
  }

  res.status(200).json(course);
};

// @desc Create a new course
// @route POST /api/courses/:id
// @access private to [admin]
const createCourse = async (req, res) => {
  const { name, description, author, length } = req.body;

  if (!name || !description || !author || !length) {
    res.status(400);
    throw new Error('All fields are mandatory for course creation.');
  }

  const course = await Course.create({
    name,
    description,
    author,
    length,
  });

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(400);
    throw new Error('Course creation data was invalid. Please try again!');
  }
};

// @desc Update course details
// @route PUT /api/courses/:id
// @access private [admin]
const updateCourse = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for finding a course.');
  }

  const course = await Course.findById(id);

  if (!course) {
    res.status(404);
    throw new Error('No course exists with the given ID.');
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCourse);
};

// @desc Delete a course
// @route GET /api/courses/:id
// @access private [admin]
const deleteCourse = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for finding a course.');
  }

  const course = await Course.findById(id);

  if (!course) {
    res.status(404);
    throw new Error('No course exists with the given ID.');
  }

  await Course.deleteOne({ _id: id });

  res.status(204).end();
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
