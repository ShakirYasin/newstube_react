const express = require('express');
const router = express.Router();
const { getAllPosts, setPost, deleteWishlist, getSinglePostState } = require('../controllers/wishListController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllPosts).post(protect, setPost).put(protect, deleteWishlist)
router.route('/:id').get(protect, getSinglePostState)


 
module.exports = router