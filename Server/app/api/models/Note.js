const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema);