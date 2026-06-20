const express = require('express');
const { createNote, getAllNotes, updateNote, 
    deleteNote, disableNote, enableNote, likeNote, unlikeNote, dashboard } = require('../controller.js/notesController');
const auth = require('../middleware/auth');
const noteimage = require('../middleware/noteimage');


const router = express.Router();
router.post('/', auth, noteimage.single('note_image'), createNote);
router.get('/', getAllNotes);
router.put('/:id', auth, noteimage.single('note_image'), updateNote);
router.delete('/:id', auth, deleteNote);
router.post('/:id/disable', auth, disableNote);
router.post('/:id/enable', auth, enableNote);
router.post('/:id/like', auth, likeNote);
router.post('/:id/unlike', auth, unlikeNote);
router.get('/dashboard', auth, dashboard);
module.exports = router;