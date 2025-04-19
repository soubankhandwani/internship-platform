const Joi = require('joi');

const admissionValidationSchema = Joi.object({
  courseId: Joi.string().required(),
});

const validateAdmission = (req, res, next) => {
  const { error } = admissionValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      title: 'Validation Failed',
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message.replace(/"/g, ''),
      })),
    });
  }

  next();
};

module.exports = validateAdmission;
