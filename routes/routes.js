const express = require('express');
const router = express.Router();
const formController = require('../controler/formPostApi');
const multer = require('multer');
const path = require('path');

const app = express();

// Multer storage 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use absolute path for the uploads directory
    const uploadDirectory = path.join(__dirname, '..', 'uploads');
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define routes
router.get('/get-form-data', formController.getFormData);
router.post('/submit-form', upload.single('file'), formController.submitForm);
router.delete('/delete-form-data/:id', formController.deleteFormData);
router.put('/edit-form-data/:id', formController.editFormData);

module.exports = router;
