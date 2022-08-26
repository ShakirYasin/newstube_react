const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const History = require('../models/historyModel');
const { default: mongoose } = require('mongoose');


// @desc POST HISTORY 
// @route POST /api/history
// @access Private
const setHistory = asyncHandler(async (req, res) => {

    if (!req.body || !req.user.id) {
        res.status(400)
        throw new Error('User or Post Not Found...')
    }
    
    const userHistory = await History.find({"user": req.user.id})
    const postId = req.body.postId

    if(!userHistory?.length){
        const newHistory = await History.create({
            user: req.user.id,
            watchHistory: [{post: postId}]
        })

        if (newHistory) {
            res.status(201).json(history)
        } else {
            res.status(400)
            throw new Error('Invalid History data')
        }
        
    }
    else {
        const currentHistory = userHistory[0]
        try {
            if(currentHistory.watchHistory.some(h => h.post == postId)){
                res.status(200).send("News Already Exists in History")
            }
            else {
                if(currentHistory.watchHistory.length < 50){
                    const history = await History.findByIdAndUpdate(currentHistory._id, {$push: {"watchHistory": {post: postId}}}, {new: true, upsert: true})
                    res.status(200).json(history)
                }
                else{
                    const watchHistory = currentHistory.watchHistory
                    watchHistory.splice(watchHistory.length-1, 1, {post: postId})

                    const history = await History.findByIdAndUpdate(currentHistory._id, {"watchHistory": watchHistory}, {new: true, upsert: true})
                    res.status(200).json(history)
                }
            }

        } catch (error) {
            res.status(400)
            throw new Error({message: "Error occurred while updating History", error})
        }
    }
})


// @desc GET ENTIREHISTORY 
// @route GET /api/history
// @access Private
const getEntireHistory = asyncHandler(async (req, res) => {

    if (!req.user.id) {
        res.status(400)
        throw new Error('User Not Found...')
    }

    const entireHistory = await History.find({"user": req.user.id}).populate("watchHistory.post")

    if(entireHistory){
        res.status(200).json(entireHistory)
    }
    else {
        res.status(400)
        throw new Error('History Not Found...')
    }

})

module.exports = {
    getEntireHistory, 
    setHistory, 
    // deleteEntireHistory, 
    // deleteHistory
}