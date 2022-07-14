const router = require('express').Router();
const {createNote, getNote, editNote, getUserNotes, deleteNote} = require('../controllers/notes.controller');
const verify = require('../../middlewares/tokenVerify')

router.post('/', verify, createNote);
router.get('/', verify, getNote)
router.put('/', verify, editNote)
router.get('/all', verify, getUserNotes)
router.delete('/', verify, deleteNote)

module.exports = router;