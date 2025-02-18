const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your firstname. It is mandatory!'],
    },

    lastName: {
      type: String,
      required: [true, 'Please enter your lastname. It is mandatory!'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email address. It is mandatory!'],
      unique: [true, 'This email address is already taken.'],
    },

    phone: {
      type: String,
      required: [true, 'Please enter your phone number. It is mandatory!'],
    },

    password: {
      type: String,
      required: [
        true,
        'Please enter a password for your account. It is mandatory!',
      ],
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
