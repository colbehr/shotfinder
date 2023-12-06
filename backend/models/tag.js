const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        unique: true,
        index: true, // Add an index for performance
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Tag', tagSchema);