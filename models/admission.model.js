const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const admissionSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Admission', admissionSchema);
