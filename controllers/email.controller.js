const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const Course = require('../models/course.model'); // assuming basic course info
const CourseDetails = require('../models/course-details.model');

exports.sendEnrollmentEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(req.params.courseId);
    const courseDetails = await CourseDetails.findOne({ courseId: req.params.courseId });

    if (!user || !course || !courseDetails) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Internship - Digital University" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Course Enrollment: ${course.title}`,
      html: `
        <h2>New Course Enrollment</h2>
        <h3>User Details</h3>
        <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <h3>Course Details</h3>
        <p><strong>Title:</strong> ${course.title}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Category:</strong> ${course.category}</p>
        <p><strong>Level:</strong> ${course.level}</p>
        <p><strong>Certificate:</strong> ${courseDetails?.certificate?.type}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Enrollment email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send enrollment email' });
  }
};
