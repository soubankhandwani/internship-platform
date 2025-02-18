const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name of the course. It is mandatory!'],
  },

  description: {
    type: String,
    required: [
      true,
      'Please enter description of the course. It is mandatory!',
    ],
  },

  author: {
    type: String,
    required: [true, 'Please enter author of the course. It is mandatory!'],
  },

  length: {
    type: String,
    required: [true, 'Please enter length of the course. It is mandatory!'],
  },
});

module.exports = mongoose.model('Course', courseSchema);
