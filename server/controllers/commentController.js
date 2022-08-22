const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Collection = require('../models/collectionModel');
const Comment = require('../models/CommentModel');
const ChildComment = require('../models/ChildCommentModel');


// @desc POST COMMENT 
// @route POST /api/comments
// @access Private
const setComment = asyncHandler(async (req, res) => {

    if (!req.body || !req.user.id) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    if(!req.body.postId){
        res.status(400)
        throw new Error('Post does not exist...')
    }
    if(!req.body.comment){
        res.status(400)
        throw new Error('Please write a comment...')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('Sign in to comment...')
    }

    try {
        if(req.body.parentCommentId){

            const childComment = await ChildComment.create({
                postId: req.body.postId,
                userId: req.user.id,
                comment: req.body.comment
            })

            const parentComment = await Comment.findByIdAndUpdate(req.body.parentCommentId, 
                    {$push: {"children": {"comment": childComment._id}}}, {new: true, upsert: true}
                ).exec();

            if(!parentComment){
                res.status(400)
                throw new Error('Comment you are replying to does not exist...')
            }

            res.status(200).json({
                newComment: childComment
            })
        }
        else {
            const comment = await Comment.create({
                postId: req.body.postId,
                userId: req.user.id,
                comment: req.body.comment
            })
            if(!comment) {
                res.status(400)
                throw new Error('There was an error while commenting...')
            }
            res.status(200).json(comment)        
        }
        
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


// @desc GET COMMENT 
// @route GET /api/comments
// @access Public
const getAllComments = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({"postId": req.params.id}).populate("children.comment").populate("userId","name _id profilePicture email")
        console.log(comments)
        res.status(200).json(comments)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

module.exports = {
    setComment,
    getAllComments
}