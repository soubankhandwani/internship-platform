const express = require('express');
const multer = require('multer');
const path = require('path')
const validateToken = require('../middlewares/validate-token-handler.middleware');
const requiredRole = require('../middlewares/check-role-handler.middleware');
const {
  getAdmissions,
  createAdmission,
} = require('../controllers/admission.controller');
const validateAdmission = require('../validations/admission.validation');

const router = express.Router();

/// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/resumes/'),
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

router.use(validateToken);

router
  .get('/', requiredRole(['admin']), getAdmissions)
  .post(
    '/',
    requiredRole(['user', 'admin']),
    upload.single("resume"),
    createAdmission
  );

module.exports = router;
