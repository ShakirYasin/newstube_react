const express = require('express');
const router = express.Router();
const { setComment, getAllComments } = require('../controllers/commentController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').post(protect, setComment)
router.route('/:id').get(getAllComments)

module.exports = router
