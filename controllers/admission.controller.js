const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const Admission = require('../models/admission.model');
const Course = require('../models/course.model');
const Internship = require('../models/internship.model');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

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
    const { id: userId, email } = req.user;
    const courseId = req.body.courseId
      ? req.body.courseId
      : req.body.internshipId;
    const resumePath = req.file?.path ? req.file.path : '';
    const isCourse = req.body.courseId ? true : false;

    // Validation
    if (!courseId)
      return res.status(400).json({ message: 'Course ID is required.' });
    if (!isCourse && !resumePath)
      return res.status(400).json({ message: 'Resume file is required.' });

    // Check for existing admission
    const existing = await Admission.findOne({ userId, courseId });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'You have already applied for this course.' });
    }

    // Create admission record
    const admission = await Admission.create({
      userId,
      courseId,
      resumePath,
    });

    // Fetch course details for email
    if (isCourse) {
      const course = await Course.findById(courseId);
      const courseTitle = course?.title || 'Unknown Course';
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Admission: ${email} applied for ${courseTitle}`,
        text: `User: ${email} (ID: ${userId})\nCourse: ${courseTitle} (ID: ${courseId})`,
      });
    } else {
      const internship = await Internship.findById({ _id: courseId });
      const internshipTitle = internship?.title || 'Unknown Internship';
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Admission: ${email} applied for ${internshipTitle}`,
        text: `User: ${email} (ID: ${userId})\nCourse: ${internshipTitle} (ID: ${courseId})`,
        attachments: [
          { filename: path.basename(resumePath), path: resumePath },
        ],
      });
    }

    res
      .status(201)
      .json({ admission, message: 'Admission created and email sent.' });
  } catch (error) {
    console.error('Admission error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdmissions,
  createAdmission,
};
