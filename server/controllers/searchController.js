const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');


// @desc GET Channel 
// @route GET /api/channel
// @access Public
const getAllResults = asyncHandler(async (req, res) => {

    if(req.body.value !== ""){
        const channels = await User.find({$and:[
            {
                "name": {
                    "$regex": req.body.value,
                    "$options": "i"
                }
            },
            {
                "isACreator": true
            }
        ]}).select("name _id profilePicture")
        const posts = await Post.find({$or:[
            {
                "title": {
                    "$regex": req.body.value,
                    "$options": "i"
                }
            },
            {
                "description": {
                    "$regex": req.body.value,
                    "$options": "i"
                }
            }
        ]}).select("_id title description image")
       
        res.status(200).json({
            channels,
            news: posts
        })
    }
})


module.exports = {
    getAllResults
}