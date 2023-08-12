const express = require('express')
const router = express.Router()
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post('/', async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username, email: user.email })
      else return res.json({ status: false })
    }
  })
});

module.exports = router