const express = require('express')
const router = express.Router()
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        const token = createSecretToken(user._id);


        res.cookie("token", token, { httpOnly: true });

        res.cookie("id", user._id, { httpOnly: true });

        // res.cookie("id", user._id, {
        //     httpOnly: false,
        //     secure: process.env.NODE_ENV === 'production',
        //     withCredentials: true,
        //     sameSite: 'None',
        // });

        console.log(token);
        console.log(user._id);
        res.status(201).json({ message: "User logged in successfully", success: true, token: token, id: user._id });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router