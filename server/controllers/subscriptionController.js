const asyncHandler = require('express-async-handler');
const Subscription = require('../models/subscriptionModel');


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


module.exports = {
    getSubscribersNumber,
    getIsSubscribed,
    setSubscribe,
    setUnsubscribe
}