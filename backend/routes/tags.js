const express = require('express')
const router = express.Router()
const Tag = require('../models/tag')


/**
 * @name get /
 * get a set of tags, will use search term or give back random set *most of the time
 * https://www.youtube.com/watch?v=0T4GsMYnVN4
 */
router.get('/', async (req, res) => {
    try {
        let search = req.query.search || ""
        let limit = 7
        if (search == "undefined") {
            search = ""
        }
        // regex "starts with" search
        // then search with 'starts with' regex 
        // or 'anywhere' regex, leave in that order
        const tags = await Tag.find(
            search.length > 0 ?
            { $or:[ 
            { "tag": {$regex: "^"+search, $options: "i"} },
            { "tag": {$regex: search} }]} : {}
        ).limit(limit).select('tag -_id')

        res.json(tags.sort((a, b) => compareFn(a, b, search)))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @name post /
 * Accepts a single tag string, posts to database and uploads 
 */
router.post('/', async (req, res) => {

    let userTag = req.body.tag
    console.log(req.body);
    if (userTag) {
        userTag = userTag.trim();
        userTag = userTag.toLowerCase();
        console.log(userTag);

        const tag = new Tag({
            tag: userTag,
        });

        try {
            const newTag = await tag.save()
            res.status(201).json(tag)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(400).json({ message: "Submit a tag" })
    }

})

// compare function that keeps strings that match at the start at the front
function compareFn(a, b, searchTerm) {
    // Check if both tags start with searchTerm
    var aStartsWith = a.tag.startsWith(searchTerm);
    var bStartsWith = b.tag.startsWith(searchTerm);

    // If both start with searchTerm, use default comparison
    if (aStartsWith && bStartsWith) {
        return a.tag.localeCompare(b.tag);
    }

    // If only one starts with searchTerm, put it before the other
    if (aStartsWith) {
        return -1;
    }
    if (bStartsWith) {
        return 1;
    }

    // If neither starts with searchTerm, use default comparison
    return a.tag.localeCompare(b.tag);
}

module.exports = router