const express = require('express');
const { register,login, getCurrentUser, uploadProfileImage } = require('../controller.js/authController');
const upload = require('../middleware/fileupload');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register',upload.single('profile_image'), register);
router.post('/login', login);
router.get('/me', auth, getCurrentUser);
router.post('/upload-profile-image', auth, upload.single('profile_image'), uploadProfileImage);

module.exports = router;
