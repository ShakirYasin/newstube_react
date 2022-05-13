const express = require('express');
const router = express.Router();
const { getPosts, setPosts, updatePosts, deletePosts } = require('../controllers/postController');

router.route('/').get(getPosts).post(setPosts)
router.route('/:id').put(updatePosts).delete(deletePosts)


module.exports = router