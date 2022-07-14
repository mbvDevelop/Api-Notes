const tokenVerify = require('../../middlewares/tokenVerify');
const Note = require('../models/Note');

const createNote = async (req, res) => {
    const userID = req.user;
    const title = req.body.title
    const body = req.body.note

    if (userID == null || title == null || body == null) {
        return res.status(500);
    }
    const note = new Note({
        title: req.body.title,
        body: req.body.note,
        user_id: userID 
    });

    try {
        const savedNote = await note.save();
        res.status(200).send(savedNote);
    } catch(err) {
        res.status(500).send(err);
    }
}

const getNote = async (req, res) => {

    const noteId = req.body.id

    if (noteId == null) {
        return res.status(500);
    }
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).send('Note Not Found');
    res.send(note)
}

const editNote = async (req, res) => {
    const noteId = req.query.id
    const noteBody = req.body.note
    const noteTitle = req.body.title
    if (noteId == null) {
        return res.status(500);
    }
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).send('Note Not Found');
    note.title = noteTitle;
    note.body = noteBody;

    try {
        const savedNote = await note.save();
        res.status(200).send(savedNote);
    } catch(err) {
        res.status(500).send(err);
    }
}

const getUserNotes = async (req, res) => {
    const userID = req.user;

    if (userID == null ) {
        return res.status(500);
    }
    const notes = await Note.find({user_id: userID})
    res.json(notes)

}

const deleteNote = async (req, res) => {
    const noteId = req.query.id;
    const title = req.body.title
    const body = req.body.note

    const note = Note.findById(noteId);
    await Note.remove(note)
    res.send('Note Deleted')
}

module.exports = {
    createNote,
    getNote,
    editNote,
    getUserNotes,
    deleteNote
}
