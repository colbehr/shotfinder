const express = require('express')
const router = express.Router()
const Tag = require('../models/tag')



//get all 
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find()
        res.json(tags)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//search 
//https://www.youtube.com/watch?v=0T4GsMYnVN4
router.get('/find', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 10
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
        console.log(search, sortBy, num_found);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//create one
router.post('/', async (req, res) => {
    
    // let tagsFormatted = req.body.tags.split(',')
    // tagsFormatted = tagsFormatted.map(tag => tag.trim());
    // tagsFormatted = tagsFormatted.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));
    // console.log(tagsFormatted);

    // const tag = new Tag({
    //     //An array of tags
    //     tags: tagsFormatted,
    // });

    // try {
    //     const newFrame = await frame.save()
    //     res.status(201).json(newFrame)
    // } catch (error) {
    //     res.status(400).json({ message: error.message })
    // }
})


module.exports = router