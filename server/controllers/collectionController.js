const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const { default: mongoose } = require('mongoose');


// @desc GET AllPosts 
// @route GET /api/posts
// @access Public
const getAllCollections = asyncHandler(async (req, res) => {
    const collection = await Collection.find({})

    res.status(200).json(collection)
})

// @desc SET Posts 
// @route SET /api/posts
// @access Private
const setCollection = asyncHandler(async (req, res) => {

    if (!req.body || !req.user.id) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    
    // console.log("Next line is the user")
    // console.log(user._id)
    // console.log("news: ", req.body.news)
    let allPosts = req.body.news
    // let allPosts = await Post.find({"_id": {$in: req.body.news}}).select("_id")
    // if(!allPosts){
    //     res.status(404)
    //     throw new Error('Add at least 1 news')
    // }

    allPosts = allPosts.map(id => ({postId: mongoose.Types.ObjectId(id)}))
    
    if(user.isACreator){
        const collection = await Collection.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            posts: allPosts
        })
    
        res.status(200).json(collection)
    }
    else{
        res.status(401)
        throw new Error('Unauthorized')
    }

})

// @desc GET AllPosts 
// @route GET /api/posts
// @access Public
const getSingleCollection = asyncHandler(async (req, res) => {
    const collection = await Collection.findById(req.body.id)
    if(!collection) {
        res.status(404).send("Post Not Found")
    }
    
    // const user = await User.findById(collection.user).select("name profilePicture _id")

    // if(!user) {
    //     res.status(404).send("User Not Found")
    // }

    res.status(200).json({
        collection
    })
})

// @desc UPDATE Posts 
// @route PUT /api/posts/:id
// @access Private
const updateSingleCollection = asyncHandler(async (req, res) => {
    const collection = await Collection.findById(req.body.id)

    if (!collection) {
        res.status(400)
        throw new Error('Post not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    // Make sure the logged in user matches the goal user
    if (collection.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    let body = {
        title: req.body.title,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        user: req.user.id,
        posts: req.body.news
    }

    const updatedCollection = await Collection.findByIdAndUpdate(req.body.id, body, { new: true })

    res.status(200).json(updatedCollection)
})

// @desc DELETE Posts 
// @route DELETE /api/posts/:id
// @access Private
const deleteSingleCollection = asyncHandler(async (req, res) => {
    const collection = await Collection.findById(req.body.id)

    if (!collection) {
        res.status(400)
        throw new Error('Post not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    // Make sure the logged in user matches the goal user
    if (collection.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await collection.remove()

    res.status(200).json({ id: req.body.id })
})

// @desc GET AllPosts 
// @route GET /api/posts
// @access Public
const deleteAllCollections = asyncHandler(async (req, res) => {
    const collections = await Collection.deleteMany({})

    res.status(200).json(collections)
})



module.exports = {
    setCollection, 
    deleteAllCollections, 
    getAllCollections, 
    getSingleCollection, 
    updateSingleCollection, 
    deleteSingleCollection
}