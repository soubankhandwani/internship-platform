const mongoose = require('mongoose');

const courseDetailsSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    unique: true,
  },
  longDescription: { type: String, required: true },
  syllabus: [
    {
      title: { type: String, required: true },
      topics: [{ type: String, required: true }],
    },
  ],
  requirements: [{ type: String, required: true }],
  forWhom: [{ type: String, required: true }],
  whatYouWillLearn: [{ type: String, required: true }],
  certificate: {
    type: {
      type: String,
      required: true,
    },
    accreditation: { type: String, required: true },
    validity: { type: String, required: true },
    features: [{ type: String, required: true }],
  },
});

module.exports = mongoose.model('CourseDetails', courseDetailsSchema);
