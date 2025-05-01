const mongoose = require('mongoose');

const internshipSchema = mongoose.Schema({
  title: {
    type: String,
    required: [
      true,
      'Please enter the name of the internship. It is mandatory!',
    ],
  },

  description: {
    type: String,
    required: [
      true,
      'Please enter the description of the internhsip. It is mandatory!',
    ],
  },

  instructor: {
    type: String,
    required: [
      true,
      'Please enter the instructor of the internship. It is mandatory!',
    ],
  },

  duration: {
    type: String,
    required: [
      true,
      'Please enter the duration of the internship. It is mandatory!',
    ],
  },

  price: {
    type: Number,
    required: [
      true,
      'Please enter the price of the internship. It is mandatory!',
    ],
  },

  image: {
    type: String,
    required: [
      true,
      'Please provide the image URL for the internship. It is mandatory!',
    ],
  },

  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [
      true,
      'Please specify the level of the internship. It is mandatory!',
    ],
  },

  category: {
    type: String,
    enum: ['Web Development', 'Data Science', 'Marketing'],
    required: [
      true,
      'Please specify the category of the course. It is mandatory!',
    ],
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipDetails',
  },
});

module.exports = mongoose.model('Internship', internshipSchema);
