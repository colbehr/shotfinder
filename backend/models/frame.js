const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema({
    tags: [{
        type: String
    }],
    frameURL: {
        type: String,
    },
    movieInfo: {
        title: {
            type: String,
        },
        year: {
            type: String,
        },
        imdb: {
            type: String,
        },
        type: {
            type: String,
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
        colorist: {
            type: String,
        },
        makeup: {
            type: String,
        },
        wardrobe: {
            type: String,
        },
    },
    frameInfo: {
        palette: {
            type: String,
        },

        shotType: {
            type: String,
        },

        lightingType: {
            type: String,
        },

        locationType: {
            type: String,
        },

        timeOfDay: {
            type: Number,
        },

        numberOfPeople: {
            type: Number,
        },
        timePeriod: {
            type: String,
        },
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