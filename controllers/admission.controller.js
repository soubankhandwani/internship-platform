const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Admission = require('../models/admission.model');

// @desc List all admissions
// @route GET /api/admissions
// @access private [admin]
const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json(admissions);
  } catch (error) {
    throw new Error(error.message);
  }
};

// @desc Create an admission
// @route POST /api/admissions
// @access private [user, admin]
const createAdmission = async (req, res) => {
  try {
    const { email, id: userId } = req.user;
    const { courseId } = req.body;

    if (!email || !userId || !courseId) {
      throw new Error('Course details validation failed');
    }

    const existingAdmission = await Admission.findOne({
      userId,
      courseId,
    });

    if (existingAdmission) {
      return res
        .status(400)
        .json({ message: 'User is already admitted to this course.' });
    }

    const admission = await Admission.create({
      userId,
      courseId,
    });

    if (admission) {
      res.status(200).json(admission);
    } else {
      res.status(400);
      throw new Error('Admission creation data was invalid. Please try again!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAdmissions,
  createAdmission,
};
