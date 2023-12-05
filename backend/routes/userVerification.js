const express = require('express')
const router = express.Router()
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post('/', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false, message: "Token not provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.json({ status: false, message: "Invalid token" });
        }

        try {
            const user = await User.findById(data.id);

            if (user) {
                return res.json({ status: true, user: { username: user.username, email: user.email } });
            } else {
                return res.json({ status: false, message: "User not found" });
            }
        } catch (error) {
            console.error("Error finding user:", error);
            return res.json({ status: false, message: "Error finding user" });
        }
    });
});

module.exports = router