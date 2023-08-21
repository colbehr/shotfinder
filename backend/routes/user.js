const express = require('express')
const router = express.Router()
const User = require("../models/user");
const Frame = require("../models/frame");

router.get('/', async (req, res, next) => {
    try {
        res.status(201).json({ message: "User" });
        next()
    } catch (error) {
        console.error(error);
    }
});

router.get('/favorites/', async (req, res) => {
    try {
        const userId = req.body.user_id;
        const user = await User.findById(userId).populate('favorites');

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/favorite/:id', async (req, res) => {
    try {
        const userId = req.body.user_id;
        const frameId = req.params.id;

        const user = await User.findById(userId);
        const frame = await Frame.findById(frameId);

        // Check if the Frame exists and if the user has already favorited it
        if (frame && !user.favorites.includes(frameId)) {
            // Add the Frame id to the user's favorites 
            user.favorites.push(frameId);
            await user.save();
            res.status(200).json({ message: 'Frame added to favorites' });
        } else {
            res.status(400).json({ message: 'Frame not found or already favorited' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/favorite/:id', async (req, res) => {
    try {
        const userId = req.body.user_id;
        const frameId = req.params.id;

        const user = await User.findById(userId);

        // Find the index of the post id in the user's favorites array
        const index = user.favorites.indexOf(frameId);

        // Remove the post id from the user's favorites array
        if (index > -1) {
            user.favorites.splice(index, 1);
            await user.save();
            res.status(200).json({ message: 'Post deleted from favorites' });
        } else {
            res.status(400).json({ message: 'Post not found in favorites' });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router