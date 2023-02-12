const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
        unique: true,
        dropDups: true
    },
    uploadDate:{
        type: Date,
        required:true,
        default: Date.now,
        immutable: true
    },
    updateDate:{
        type: Date,
        required:true,
        default: Date.now
    },
    filmName:{
        type:String,
        required: true
    },
    frameURL:{
        type:String,
        required: true
    },

})

module.exports = mongoose.model('Frame', frameSchema);