const express = require('express')
const router = express.Router()
const Frame = require('../models/frame')
const tags = require('../routes/tags')
const multer = require('multer')
const path = require('node:path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
})

//Check that the file is only png, jpg or jpeg
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

/**
 * @name get /
 * search route, finds frames by search query, 
 * also used for populating front page without query
 * https://www.youtube.com/watch?v=0T4GsMYnVN4
 */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 35
        let search = ""
        if (req.query.search) {
            search = req.query.search.trim() 
        }
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
        let filter = []
        if (search) {
            filter = search.split(",")
        }
        const frames = await Frame.find(
            filter.length > 0 ? { tags: { $all: filter } } : {}
        ).sort(sortBy).skip(page * limit).limit(limit)

        const num_found = await Frame.countDocuments(
            filter.length > 0 ? { tags: { $all: filter } } : {})

        const response = {
            error: false,
            num_found,
            page: page + 1,
            limit,
            frames,
        }
        console.log(search || "<empty string>", page, num_found);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/**
 * @name get /movie
 * finds all frames from movie specified in query
 * has to be initialized before GET /:id  
 */
router.get('/movie', async (req, res) => {
    try {
        const title = req.query.movie
        const frames = await Frame.find().where("movieInfo.title").equals(title).limit(30)
        if (req.query.id) {
            const notID = req.query.id
            frames.forEach(function(item, index, object) {
                if (item._id.toString() === notID){
                    object.splice(index, 1);
                }
            });
        }
        res.status(200).json(frames)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @name get /:id
 * get specific frame from db
 */
router.get('/:id', getFrame, (req, res) => {
    res.send(res.frame)
})

/**
 * @name post /
 * Accepts a post from the upload form, posts to database and uploads 
 */
router.post('/', upload.single('file'), async (req, res) => {
    //get url 
    //req.protocol + '://' + req.get('host') + 
    const url = '/' + req.file.path.replace('\\','/');
    // console.log("Uploaded", req.body);
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
    tagsFormatted = tagsFormatted.map(tag => tag.toLowerCase());
    console.log(tagsFormatted);

    //calls the route from tags.js to send tags to db
    tagsFormatted.forEach(tag => {
        tags.postTag(tag)
    });

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

/**
 * @name patch /:id
 * update database 
 */
router.patch('/:id', getFrame, async (req, res) => {
    // console.log(req.body, res.frame);
    res.frame.movieInfo = req.body.movieInfo
    res.frame.tags = req.body.tags
    res.frame.updateDate = Date.now()
    try {
        const updatedFrame = await res.frame.save()
        res.json(updatedFrame)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

/**
 * @name delete /:id
 * delete from database 
 */
router.delete('/:id', getFrame, async (req, res) => {
    const fs = require('fs')

    try {
        filepath = path.normalize(process.cwd() + res.frame.frameURL);
        console.log("DELETE:",filepath);
        //remove file 
        fs.unlink(filepath, (err) => {
            if (err) {
            console.error(err)
            return
            }
            //file removed
        })
        //remove database entry
        await res.frame.remove()
        res.json({ message: 'Deleted Frame' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

/**
 * @name getFrame
 * Middleware for finding a post by id
 */
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

// A route for debugging purposes, move to top when in use
// router.get('/debug', async (req, res) => {
//     console.log("debug");
//     try {
//         const frames = await Frame.find()
//         let convertedFrames = frames.map(frame => {
//             frame.frameURL = frame.frameURL.replace("http://127.0.0.1:3001", "")
//             frame.frameURL = frame.frameURL.replace('\\','/');
//             return { frame };
//         });
//         convertedFrames.forEach(frame => {
//             frame = frame.frame
//             console.log(frame.tags);
//             Frame.findByIdAndUpdate (
//                 frame._id, // filter by _id
//                 frame, // update data
//                 { upsert: true }, // upsert option
//                 function (err) { // callback
//                   if (err) {
//                     console.error (err);
//                   }
//                 }
//               );
            
//         });
//         res.json(convertedFrames)

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


module.exports = router