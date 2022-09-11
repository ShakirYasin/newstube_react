const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Wishlist = require('../models/wishListModel');


// @desc GET AllPosts 
// @route GET /api/posts
// @access Public
const getAllPosts = asyncHandler(async (req, res) => {

    if (!req.user.id) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    const posts = await Wishlist.findOne({user: req.user.id}).populate("wishlist.post")

    res.status(200).json(posts)
})

// @desc SET Posts 
// @route SET /api/posts
// @access Private
const setPost = asyncHandler(async (req, res) => {

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
    const userWishlist = Wishlist.find({user: req.user.id})

    if(!userWishlist?.length){
        const wishlist = await Wishlist.create({
            user: req.user.id,
            wishlist: [{
                post: req.body.post
            }]
        })
    
        if (wishlist) {
            res.status(201).json(wishlist)
        } else {
            res.status(400)
            throw new Error('Invalid History data')
        }

    }
    else {
        const currentWishlist = userWishlist[0]
        try {
            if(currentWishlist.wishlist.some(h => h.post == req.body.id)){
                res.status(200).send("News Already Exists in History")
            }
            else {
                const wishlist = await Wishlist.findByIdAndUpdate(currentWishlist._id, {$push: {"wishlist": {post: req.body.id}}}, {new: true, upsert: true})
                res.status(200).json(wishlist)
            }

        } catch (error) {
            res.status(400)
            throw new Error({message: "Error occurred while updating Wishlist", error})
        }
    }


})


// @desc DELETE SINGLEHISTORY 
// @route GET /api/history/:id
// @access Private
const deleteWishlist = asyncHandler(async (req, res) => {

    if (!req.user.id) {
        res.status(400)
        throw new Error('User Not Found...')
    }
    
    const userWishList = await Wishlist.findOne({"user": req.user.id})
    
    if(!userWishList){
        res.status(400)
        throw new Error('User has no wishlist...')    
    }

    const postId = req.params.id
    const updatedWishlist = userWishList.wishlist.filter(h => h.post != postId)

    const wishlist = await Wishlist.findByIdAndUpdate(userWishList._id, {"wishlist": updatedWishlist}, {new: true, upsert: true})

    if(wishlist){
        res.status(200).json(wishlist)
    }
    else {
        res.status(400)
        throw new Error("There was a problem updating your wishlist")
    }

})




module.exports = {
    getAllPosts,
    setPost,
    deleteWishlist
}