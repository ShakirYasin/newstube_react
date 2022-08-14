const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');


// @desc GET Channel 
// @route GET /api/channel
// @access Public
const getUserChannel = asyncHandler(async (req, res) => {
    // console.log(req);
    const user = await User.findById(req.params.id)
    const posts = await Post.find({ user: req.params.id })

    res.status(200).json({
        user,
        news: posts.reverse(),
    })
})


module.exports = {
    getUserChannel
}