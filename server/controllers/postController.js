const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');


// @desc GET AllPosts 
// @route GET /api/posts
// @access Public
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({})

    res.status(200).json(posts)
})

// @desc GET Posts 
// @route GET /api/posts
// @access Private
const getUserPosts = asyncHandler(async (req, res) => {
    console.log(req);
    const posts = await Post.find({ user: req.user.id })

    res.status(200).json(posts)
})

// @desc SET Posts 
// @route SET /api/posts
// @access Private
const setPosts = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id
    })

    res.status(200).json(post)
})

// @desc UPDATE Posts 
// @route PUT /api/posts/:id
// @access Private
const updatePosts = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
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
    if (post.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedPost)
})

// @desc DELETE Posts 
// @route DELETE /api/posts/:id
// @access Private
const deletePosts = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
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
    if (post.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await post.remove()

    res.status(200).json({ id: req.params.id })
})



module.exports = {
    getAllPosts,
    getUserPosts,
    setPosts,
    updatePosts,
    deletePosts
}