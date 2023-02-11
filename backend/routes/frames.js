const express = require('express')
const router = express.Router()

// upload files and json, send to db

// get specific frame from db

// search files in db

//get all 
router.get('/', (req,res) =>{
    res.json("all")
})
//get one
router.get('/:id', (req,res) =>{

})
//create one
router.post('/', (req,res) =>{

})
//update one
router.patch('/:id', (req,res) =>{

})
//delete one
router.delete('/:id', (req,res) =>{

})
module.exports = router

