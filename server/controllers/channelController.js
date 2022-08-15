const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');


// @desc GET Channel 
// @route GET /api/channel
// @access Public
const getUserChannel = asyncHandler(async (req, res) => {
    // console.log(req);
    const user = await User.findById(req.params.id).select("-password -updatedAt -__v -role")
    const posts = await Post.find({ user: req.params.id }).sort({createdAt: "desc"})

    if(!user){
        res.status(404).send("Channel not Found")
    }

    if(user?.isACreator){
        res.status(200).json({
            user,
            news: posts,
        })  
    }
    else{
        res.status(400).send("Channel does not exist")
    }
})


module.exports = {
    getUserChannel
}