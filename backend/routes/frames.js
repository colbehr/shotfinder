const express = require('express')
const router = express.Router()
const Frame = require('../models/frame')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

//get all 
router.get('/', async (req, res) => {
    try {
        const frames = await Frame.find()
        res.json(frames)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//search 
//https://www.youtube.com/watch?v=0T4GsMYnVN4
router.get('/find', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 35
        const search = req.query.search || ""
        let sort = req.query.sort || "uploadDate"

        //sort is passed like this "year,desc" using year as an example
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

        //either sort by whatever is passed for sort, otherwise desc
        let sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1]
        } else {
            sortBy[sort[0]] = "desc"
        }

        //Query DB for title and tags
        let regex = new RegExp(search, 'i');
        const frames = await Frame.find({
            $or: [
                { "movieInfo.title": regex },
                { tags: regex }
            ]
        }).sort(sortBy).skip(page * limit).limit(limit)

        
        const num_found = await Frame.countDocuments({
            $or: [
            { "movieInfo.title": regex },
            { tags: regex }
        ]})

        const response = {
            error: false,
            num_found,
            page: page + 1,
            limit,
            frames,

        }
        console.log(search, page, num_found);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get one
// get specific frame from db
router.get('/:id', getFrame, (req, res) => {
    res.send(res.frame)
})

//create one
router.post('/', upload.single('file'), async (req, res) => {
    //get url
    const url = req.protocol + '://' + req.get('host') + '/' + req.file.path;
    console.log("Uploaded", req.body);
    let movieInfo = {}
    movieInfo["title"] = req.body.title.trim()
    movieInfo["imdb"] = req.body.imdb.trim()
    movieInfo["year"] = req.body.year.trim()
    movieInfo["type"] = req.body.type.trim()
    movieInfo["director"] = req.body.director.trim()
    movieInfo["cinematographer"] = req.body.cinematographer.trim()
    movieInfo["editor"] = req.body.editor.trim()
    movieInfo["setDesigner"] = req.body.setDesigner.trim()
    movieInfo["colorist"] = req.body.colorist.trim()
    movieInfo["makeup"] = req.body.makeup.trim()
    movieInfo["wardrobe"] = req.body.wardrobe.trim()

    let tagsFormatted = req.body.tags.split(',')
    tagsFormatted = tagsFormatted.map(tag => tag.trim());
    tagsFormatted = tagsFormatted.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));
    console.log(tagsFormatted);

    const frame = new Frame({
        frameURL: url,
        //movie specific info
        movieInfo: movieInfo,
        //An array of tags
        tags: tagsFormatted,
    });

    try {
        const newFrame = await frame.save()
        res.status(201).json(newFrame)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// update one
// upload files and json, send to db
router.patch('/:id', getFrame, async (req, res) => {
    if (req.body.name != null) {
        res.frame.name = req.body.name
    }
    if (req.body.filmName != null) {
        res.frame.filmName = req.body.filmName
    }
    if (req.body.frameURL != null) {
        res.frame.frameURL = req.body.frameURL
    }
    res.frame.updateDate = Date.now()
    try {
        const updatedFrame = await res.frame.save()
        res.json(updatedFrame)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// delete one
router.delete('/:id', getFrame, async (req, res) => {
    try {
        await res.frame.remove()
        res.json({ message: 'Deleted Frame' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

async function getFrame(req, res, next) {
    let frame
    try {
        frame = await Frame.findById(req.params.id)
        if (frame == null) {
            return res.status(404).json({ message: 'Cannot find frame' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.frame = frame
    next()
}

module.exports = router