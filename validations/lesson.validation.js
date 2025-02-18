const Joi = require('joi');

const courseValidationSchema = Joi.object({
  course_id: Joi.string().required(),
  title: Joi.string().trim().min(3).max(255).required(),
  l_number: Joi.number().integer().positive().required(),
  l_type: Joi.string().valid('video', 'text').required(),
  videoUrl: Joi.string().uri().required(),
  duration: Joi.number().positive().required(),
  content: Joi.string().trim().required(),
});

const validateCourse = (req, res, next) => {
  const { error } = courseValidationSchema.validate(req.body, {
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

module.exports = validateCourse;
