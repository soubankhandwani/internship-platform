const mongoose = require('mongoose');
const Course = require('../models/course.model');
const CourseDetails = require('../models/course-details.model');

// @desc List all courses
// @route GET /api/courses
const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
};

// @desc Get a course with details
// @route GET /api/courses/full/:id
const getCourseWithDetails = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid course ID');
  }

  const course = await Course.findById(id);
  if(!course){
    throw new Error("Course with given ID does not exists!")
  }

  const courseDetails = await CourseDetails.find({courseId: course._id})
  if(!courseDetails){
    throw new Error("No details for the said course exists!")
  }

  res.status(200).json(courseDetails);
};

// @desc   Create a course with details
// @route  POST /api/courses/full/:id
// @access private [admin]
const createFullCourseDetails = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existing = await CourseDetails.findOne({ courseId });
    if (existing) {
      return res.status(400).json({ message: 'Details already exist for this course' });
    }

    const {
      longDescription,
      syllabus,
      requirements,
      forWhom,
      whatYouWillLearn,
      certificate
    } = req.body;

    const newDetails = new CourseDetails({
      courseId,
      longDescription,
      syllabus,
      requirements,
      forWhom,
      whatYouWillLearn,
      certificate
    });

    const saved = await newDetails.save();

    res.status(201).json({
      message: 'Course details created successfully',
      data: saved
    });
  } catch (error) {
    console.error('Error creating course details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Retrieve one course
// @route GET /api/courses/:id
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
// @route POST /api/courses
// @access private [admin]
const createCourse = async (req, res) => {
  const {
    title,
    description,
    instructor,
    duration,
    rating,
    students,
    price,
    level,
    category,
  } = req.body;

  if (
    !title ||
    !description ||
    !instructor ||
    !duration ||
    rating === undefined ||
    students === undefined ||
    price === undefined ||
    !level ||
    !category
  ) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const image = req.file ? `${process.env.API_BASE_URL}/uploads/${req.file.filename}` : null;

  if (!image) {
    res.status(400);
    throw new Error('Course image is required.');
  }

  const course = await Course.create({
    title,
    description,
    instructor,
    duration,
    rating,
    students,
    price,
    image,
    level,
    category,
  });

  res.status(201).json(course);
};


// @desc Update course details
// @route PUT /api/courses/:id
// @access private [admin]
const updateCourse = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for updating a course.');
  }

  const course = await Course.findById(id);

  if (!course) {
    res.status(404);
    throw new Error('No course exists with the given ID.');
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedCourse);
};

// @desc Delete a course
// @route DELETE /api/courses/:id
// @access private [admin]
const deleteCourse = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for deleting a course.');
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
  getCourseWithDetails,
  createFullCourseDetails
};
