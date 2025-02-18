const mongoose = require('mongoose');

const Lesson = require('../models/lesson.model');
const Course = require('../models/course.model');

// @desc Retreive all lessons in a course
// @route GET /api/lessons/:id
// @access private [user, admin]
const getLessons = async (req, res) => {
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

  const lessons = await Lesson.find({ course_id: course.id });

  if (!lessons) {
    res.status(404);
    throw new Error('No lessons in the given course ID exist.');
  }

  res.status(200).json(lessons);
};

// @desc Create a new lesson in the given course id
// @route POST /api/lessons/:id
// @access private to [admin]
const createLesson = async (req, res) => {
  const { course_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(course_id)) {
    res.status(400);
    throw new Error('Invalid ID provided the course.');
  }

  const course = await Course.findById(course_id);
  if (!course) {
    res.status(404);
    throw new Error('No course exists with the given ID.');
  }

  const lesson = await Lesson.create({
    ...req.body,
  });

  if (lesson) {
    res.status(200).json(lesson);
  } else {
    res.status(400);
    throw new Error('Lesson creation data was invalid. Please try again!');
  }
};

// @desc Update lesson details
// @route PUT /api/lessons/:id
// @access private [admin]
const updateLesson = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for updating a lesson.');
  }

  const lesson = await Lesson.findById(id);

  if (!lesson) {
    res.status(404);
    throw new Error('No lesson exists with the given ID.');
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedLesson);
};

// @desc Delete a course
// @route GET /api/courses/:id
// @access private [admin]
const deleteLesson = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for deleting a lesson.');
  }

  const lesson = await Lesson.findById(id);

  if (!lesson) {
    res.status(404);
    throw new Error('No lesson exists with the given ID.');
  }

  await Lesson.deleteOne({ _id: id });

  res.status(204).end();
};

module.exports = {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};
