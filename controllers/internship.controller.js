const mongoose = require('mongoose');
const Internship = require('../models/internship.model');
const InternshipDetails = require('../models/internship-details.model');

// @desc List all internships
// @route GET /api/internships
// @access  [user, admin]
const getInternships = async (req, res) => {
  const internships = await Internship.find();
  res.status(200).json(internships);
};

// @desc Get an internship with details
// @route GET /api/internships/full/:id
// @access [user, admin]
const getInternshipWithDetails = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid course ID');
  }

  const internship = await Internship.findById(id);
  if (!internship) {
    throw new Error('Internship with given ID does not exists!');
  }

  const internshipDetails = await InternshipDetails.find({
    internshipId: internship._id,
  });
  if (!internshipDetails) {
    throw new Error('No details for the said internship exists!');
  }

  res.status(200).json(internshipDetails);
};

// @desc   Create an internship with details
// @route  POST /api/internships/full/:id
// @access private [admin]
const createFullInternshipDetails = async (req, res) => {
  try {
    const internshipId = req.params.id;

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const existing = await InternshipDetails.findOne({ internshipId });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'Details already exist for this internship' });
    }

    const {
      longDescription,
      roadmap,
      requirements,
      forWhom,
      whatYouWillLearn,
      certificate,
    } = req.body;

    const newDetails = new InternshipDetails({
      internshipId,
      longDescription,
      roadmap,
      requirements,
      forWhom,
      whatYouWillLearn,
      certificate,
    });

    const saved = await newDetails.save();

    res.status(201).json({
      message: 'Internship details created successfully',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating internship details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Retrieve one internship
// @route GET /api/internships/:id
const getInternship = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for finding a internship.');
  }

  const internship = await Internship.findById(id);
  if (!internship) {
    res.status(404);
    throw new Error('No internship exists with the given ID.');
  }

  res.status(200).json(internship);
};

// @desc Create a new internship
// @route POST /api/internships
// @access private [admin]
const createInternship = async (req, res) => {
  const { title, description, instructor, duration, price, level, category } =
    req.body;

  if (
    !title ||
    !description ||
    !instructor ||
    !duration ||
    price === undefined ||
    !level ||
    !category
  ) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const image = req.file
    ? `${process.env.API_BASE_URL}/uploads/${req.file.filename}`
    : null;

  if (!image) {
    res.status(400);
    throw new Error('Internship image is required.');
  }

  const internship = await Internship.create({
    title,
    description,
    instructor,
    duration,
    price,
    image,
    level,
    category,
  });

  res.status(201).json(internship);
};

// @desc Update internship details
// @route PUT /api/internships/:id
// @access private [admin]
const updateInternship = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for updating an internship.');
  }

  const internship = await Internship.findById(id);

  if (!internship) {
    res.status(404);
    throw new Error('No internship exists with the given ID.');
  }

  console.log(req.body);
  const updatedInternship = await Internship.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedInternship);
};

// @desc Delete an internship
// @route DELETE /api/internships/:id
// @access private [admin]
const deleteInternship = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID provided for deleting an internhips.');
  }

  const internship = await Internship.findById(id);

  if (!internship) {
    res.status(404);
    throw new Error('No internship exists with the given ID.');
  }

  await Internship.deleteOne({ _id: id });

  res.status(204).end();
};

module.exports = {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  getInternshipWithDetails,
  createFullInternshipDetails,
};
