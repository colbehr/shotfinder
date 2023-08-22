const express = require('express')
const router = express.Router()
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

router.post('/', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
        //  withCredentials: true,
         httpOnly: false,
       });
       res.cookie("id", user._id, {
        //  withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  });

  module.exports = router