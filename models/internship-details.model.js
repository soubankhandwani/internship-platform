const mongoose = require('mongoose');

const internshipDetailsSchema = mongoose.Schema({
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
    unique: true,
  },
  longDescription: { type: String, required: true },
  roadmap: [
    {
      month: { type: String, required: true },
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

module.exports = mongoose.model('IntershipDetails', internshipDetailsSchema);
