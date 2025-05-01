const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the name of the course. It is mandatory!'],
  },

  description: {
    type: String,
    required: [
      true,
      'Please enter the description of the course. It is mandatory!',
    ],
  },

  instructor: {
    type: String,
    required: [
      true,
      'Please enter the instructor of the course. It is mandatory!',
    ],
  },

  duration: {
    type: String,
    required: [
      true,
      'Please enter the duration of the course. It is mandatory!',
    ],
  },

  rating: {
    type: Number,
    required: [true, 'Please enter the rating of the course. It is mandatory!'],
  },

  students: {
    type: Number,
    required: [
      true,
      'Please enter the number of students enrolled. It is mandatory!',
    ],
  },

  price: {
    type: String,
    required: [true, 'Please enter the price of the course. It is mandatory!'],
  },

  image: {
    type: String,
    required: [
      true,
      'Please provide the image URL for the course. It is mandatory!',
    ],
  },

  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [
      true,
      'Please specify the level of the course. It is mandatory!',
    ],
  },

  category: {
    type: String,
    enum: ['Web Development', 'Python', 'Marketing', 'Project Based'],
    required: [
      true,
      'Please specify the category of the course. It is mandatory!',
    ],
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseDetails',
  },
});

module.exports = mongoose.model('Course', courseSchema);
