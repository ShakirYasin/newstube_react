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
            watchHistory: [{
                date: new Date(),
                post: postId
            }]
        })

        if (newHistory) {
            res.status(201).json(newHistory)
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
                    const history = await History.findByIdAndUpdate(currentHistory._id, {$push: {"watchHistory": {date: new Date(),post: postId}}}, {new: true, upsert: true})
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
    const reverseHistory = entireHistory[0].watchHistory.reverse()

    if(entireHistory){
        res.status(200).json([{
            ...entireHistory,
            watchHistory: reverseHistory
        }])
    }
    else {
        res.status(400)
        throw new Error('History Not Found...')
    }

})

// @desc DELETE SINGLEHISTORY 
// @route GET /api/history/:id
// @access Private
const deleteHistory = asyncHandler(async (req, res) => {

    if (!req.user.id) {
        res.status(400)
        throw new Error('User Not Found...')
    }
    
    const userHistory = await History.find({"user": req.user.id})
    
    if(!userHistory){
        res.status(400)
        throw new Error('User has no viewing history...')    
    }

    const postId = req.params.id
    const currentHistory = userHistory[0]
    const updatedHistory = currentHistory.watchHistory.filter(h => h.post != postId)

    const history = await History.findByIdAndUpdate(currentHistory._id, {"watchHistory": updatedHistory}, {new: true, upsert: true})

    if(history){
        res.status(200).json(history)
    }
    else {
        res.status(400)
        throw new Error("There was a problem updating your watch history")
    }

})

// @desc DELETE ENTIREHISTORY 
// @route GET /api/history/:id
// @access Private
const deleteEntireHistory = asyncHandler(async (req, res) => {
    
    if (!req.user.id) {
        res.status(400)
        throw new Error('User Not Found...')
    }
    
    const userHistory = await History.find({"user": req.user.id})
    
    if(!userHistory){
        res.status(400)
        throw new Error('User has no viewing history...')    
    }

    const currentHistory = userHistory[0]

    const history = await History.findByIdAndDelete(currentHistory._id)

    if(history){
        res.status(200).json(history)
    }
    else {
        res.status(400)
        throw new Error("There was a problem updating your watch history")
    }

})

module.exports = {
    getEntireHistory, 
    setHistory, 
    deleteEntireHistory, 
    deleteHistory
}