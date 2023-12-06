const express = require('express')
const router = express.Router()
const Tag = require('../models/tag')


// /tags
//     GET     - Retrieve filtered tags
//     POST    - Create a new tag

// /tags/{tagId}
//     GET     - Retrieve details of a specific tag
//     PUT     - Update details of a specific tag
//     DELETE  - Delete a specific tag

/**
 * @name GET /
 * get a set of tags, will use search term or give back random set *most of the time
 * https://www.youtube.com/watch?v=0T4GsMYnVN4
 */
router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const limit = 7;

        let query = {};
        let tags = []
        if (search.length > 0) {
            query = {
                $or: [
                    { "tag": { $regex: `^${search}`, $options: "i" } },
                    { "tag": new RegExp(search, 'i') }
                ]
            };
            tags = await Tag.find(query).limit(limit);
        } else {
            // If search is empty, fetch random tags
            tags = await Tag.aggregate([{ $sample: { size: limit } }]);
        }

        tags = tags.map(tag => ({ tag: tag.tag }))
        res.json(tags.sort((a, b) => compareFn(a, b, search)));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


/**
 * @name GET /:id
 * Get a single tag and associated data
 */
router.get('/:id', async (req, res) => {
    try {
        const tagID = req.params.id;
        const tag = await Tag.findById(tagID);

        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @name POST /
 * Accepts a single tag string, posts to database and uploads 
 */
router.post('/', async (req, res) => {
    let response = postTag(req.body.tag, res)
    res.json(response)
})

/**
 * @name postTag
 * Has to be seperated in case we want to call the function from frames.js when posting a frame
 */
async function postTag(userTag, res) {
    console.log(userTag);
    if (userTag) {
        userTag = userTag.trim();
        userTag = userTag.toLowerCase();
        console.log(userTag);

        const tag = new Tag({
            tag: userTag,
        });
        try {
            const newTag = await tag.save()
            return newTag
        } catch (error) {
            return { message: error.message }
        }
    } else {
        return { message: "Submit a tag" }
    }
}


/**
 * @name PUT /
 * Update a tag, automatically updates updateDate
 */
router.put('/:id', async (req, res) => {
    try {
        const tagID = req.params.id;

        //update updateDate
        req.body.updateDate = new Date();

        const updatedTag = await Tag.findByIdAndUpdate(tagID, req.body, { new: true });

        if (!updatedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @name DELETE /
 * Update a tag, automatically updates updateDate
 */
router.delete('/:id', async (req, res) => {
    try {
        const tagID = req.params.id;
        const deletedTag = await Tag.findByIdAndDelete(tagID);

        if (!deletedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

module.exports = { router: router, postTag: postTag }