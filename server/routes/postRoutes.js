const express = require('express');
const router = express.Router();
const { setPost, deleteAllPosts, getAllPosts, getSinglePosts, updateSinglePost, deleteSinglePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllPosts).post(protect, setPost).delete(protect, deleteAllPosts)
router.route('/:id').get(getSinglePosts).put(protect, updateSinglePost).delete(protect, deleteSinglePost)


 
module.exports = router