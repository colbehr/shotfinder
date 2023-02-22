const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema({
    
    //ID
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    imdb: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    director: {
        type: String,
    },
    cinematographer: {
        type: String,
    },
    editor: {
        type: String,
    },
    setDesigner: {
        type: String,
    },
    productionCompany: {
        type: String,
    },
    colorist: {
        type: String,
    },
    makeup: {
        type: String,
    },
    wardrobe: {
        type: String,
    },
    frameURL: {
        type: String,
        required: true
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

module.exports = mongoose.model('Frame', frameSchema);