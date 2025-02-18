const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
  {
    course_id: {
      type: String,
      required: [
        true,
        'Course ID is required to register a lesson in the course.',
      ],
    },

    title: {
      type: String,
      required: [
        true,
        'Course title is required to register a lesson in the course.',
      ],
    },

    l_number: {
      type: Number,
      unique: [true, 'Lesson order number must be unique.'],
      required: [
        true,
        'Lesson number is required to register a lesson in the course.',
      ],
    },

    l_type: {
      type: String,
      required: [
        true,
        'Type of the lesson is required whether video / reading material.',
      ],
    },

    videoUrl: {
      type: String,
      required: [
        true,
        'Lesson video URL is required to register a lesson in the course.',
      ],
    },

    duration: {
      type: Number,
      required: [
        true,
        'Lesson video duration is required to register a lesson in the course.',
      ],
    },

    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lesson', lessonSchema);
