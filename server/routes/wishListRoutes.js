const express = require('express');
const router = express.Router();
const { getAllPosts, setPost, deleteWishlist } = require('../controllers/wishListController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllPosts).post(protect, setPost)
router.route('/:id').delete(protect, deleteWishlist)


 
module.exports = router