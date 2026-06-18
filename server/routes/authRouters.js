const express = require('express');
const { register, login } = require('../controller.js/authController');
const upload = require('../middleware/fileupload');
const router = express.Router();

router.post('/register',upload.single('profile_image'), register);
router.post('/login', login);

module.exports = router;