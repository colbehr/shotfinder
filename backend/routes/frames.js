const express = require('express')
const router = express.Router()
const Frame = require('../models/frame')


//get all 
router.get('/', async (req,res) =>{
    try {
        const frames = await Frame.find()
        res.json(frames)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get one
// get specific frame from db
router.get('/:id', getFrame, (req,res) =>{
    res.send(res.frame)
})

//create one
router.post('/', async (req,res) =>{
    console.log(req.body);
    const frame = new Frame({
        title: req.body.title,
        imdb: req.body.imdb,
        year: req.body.year,
        type: req.body.type,
        frameURL: req.body.frameURL,
        director: req.body.director,
        cinematographer: req.body.cinematographer,
        editor: req.body.editor,
        setDesigner: req.body.setDesigner,
        productionCompany: req.body.productionCompany,
        colorist: req.body.colorist,
        makeup: req.body.makeup,
        wardrobe: req.body.wardrobe,
    });

    try {
        const newFrame = await frame.save()
        res.status(201).json(newFrame)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// update one
// upload files and json, send to db
router.patch('/:id', getFrame, async (req,res) =>{
    if(req.body.name != null){
        res.frame.name = req.body.name
    }
    if(req.body.filmName != null){
        res.frame.filmName = req.body.filmName
    }
    if(req.body.frameURL != null){
        res.frame.frameURL = req.body.frameURL
    }
    res.frame.updateDate = Date.now()
    try {
        const updatedFrame = await res.frame.save()
        res.json(updatedFrame)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

// delete one
router.delete('/:id', getFrame, async(req,res) =>{
    try {
        await res.frame.remove()
        res.json({message: 'Deleted Frame'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

async function getFrame(req, res, next){
    let frame
    try {
        frame = await Frame.findById(req.params.id)
        if (frame == null) {
            return res.status(404).json({message:'Cannot find frame'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.frame = frame
    next()
}


module.exports = router

