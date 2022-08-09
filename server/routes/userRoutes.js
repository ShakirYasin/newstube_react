const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUsers, updateMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// For Testing Purpose
router.get('/getall', getUsers)
router.delete('/deleteall', deleteUsers)
// For Testing Purpose ^


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/me', protect, updateMe)


module.exports = router