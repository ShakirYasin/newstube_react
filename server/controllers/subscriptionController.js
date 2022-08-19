const asyncHandler = require('express-async-handler');
const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');


// @desc GET SubscribersNumber 
// @route GET /api/subscription
// @access Public
const getSubscribersNumber = asyncHandler(async (req, res) => {
    try {
        const subscribers = await Subscription.find({"userTo": req.params.id})
        res.status(200).json({success: true, subscribersNumber: subscribers.length})
    } catch (error) {
        res.status(400).send(error)
    }
    
})

// @desc GET Subscribed 
// @route GET /api/subscription
// @access Private
const getIsSubscribed = asyncHandler(async (req, res) => {
    try {
        const subscribers = await Subscription.find({"userTo": req.params.id, "userFrom": req.user.id})
        let result = false
        if(subscribers.length !== 0){
            result = true
        }
        res.status(200).json({success: true, isSubscribed: result})
    } catch (error) {
        res.status(400).send(error)
    }
    
})

// @desc POST Subscribe 
// @route POST /api/subscription
// @access Private
const setSubscribe = asyncHandler(async (req, res) => {
    try {
        const sub = await Subscription.find({"userTo": req.body.userId, "userFrom": req.user.id})
        
        if(sub.length !== 0){
            res.status(409).send("You are already subscribed")
        }
        else if(req.body.userId === req.user.id){
            res.status(409).json({success: true, message: "You cannot subscribe to yourself"})
        }
        else {   
            const newSubscriber = await Subscription.create({
                userTo: req.body.userId,
                userFrom: req.user.id
            })
            // console.log("Works for now")
            
            res.status(200).json({success: true, newSubscriber, isSubscribed: true})
        }
    } catch (error) {
        res.status(400).send(error)
    }
    // console.log("userTo: ", req.body.userId)
    // console.log("userFrom: ", req.user.id)
})


// @desc GET Subscribed 
// @route GET /api/subscription
// @access Private
const setUnsubscribe = asyncHandler(async (req, res) => {
    try {
        const unsubscribed = await Subscription.findOneAndDelete({"userTo": req.body.userId, "userFrom": req.user.id})
        res.status(200).json({success: true, unsubscribed})
    } catch (error) {
        res.status(400).json({success: false, error})
    }
    
})


// @desc GET ChannelsSubscribed 
// @route GET /api/subscription
// @access Private
const getChannelsSubscribed = asyncHandler(async (req, res) => {
    try {
        const totalSubscriptions = await Subscription.find({"userFrom": req.user.id}).populate('userTo')
        const channelsSubscribed = await Promise.all(totalSubscriptions?.map(async (subscription) => {
            const posts = await Post.find({"user": subscription.userTo._id})
            const totalSubscribers = await Subscription.find({"userTo": subscription.userTo._id})
            return {
                _id: subscription._id,
                channelSubscribed: {
                    _id: subscription.userTo._id,
                    email: subscription.userTo.email,
                    name: subscription.userTo.name,
                    profilePicture: subscription.userTo.profilePicture,
                    totalPosts: posts.length,
                    totalSubscribers: totalSubscribers.length
                }
            }
        }))


        // console.log(channelsSubscribed);
        res.status(200).json({success: true, channelsSubscribed})
    } catch (error) {
        res.status(400).json({success: false, error})
    }
    // console.log(req.user.id)
})


module.exports = {
    getSubscribersNumber,
    getIsSubscribed,
    setSubscribe,
    setUnsubscribe,
    getChannelsSubscribed
}