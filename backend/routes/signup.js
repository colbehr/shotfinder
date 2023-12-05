const express = require('express')
const User = require("../models/user");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            httpOnly: false,
            withCredentials: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });
        res.cookie("id", user._id, {
            httpOnly: false,
            withCredentials: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });
        console.log(process.env.NODE_ENV === 'production');
        res
            .status(201)
            .json({ message: "User signed up successfully", success: true, token: token, id: user._id });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});

module.exports = router