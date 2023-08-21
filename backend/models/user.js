const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    favorites: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Frame' 
    }]

});
// TODO https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 13);
});

module.exports = mongoose.model("User", userSchema);
