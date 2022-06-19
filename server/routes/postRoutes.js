const express = require('express');
const router = express.Router();
const { getUserPosts, setPosts, updatePosts, deletePosts, getAllPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllPosts).post(protect, setPosts)
router.route('/:id').get(protect, getUserPosts).put(protect, updatePosts).delete(protect, deletePosts)


module.exports = router