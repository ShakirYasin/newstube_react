const express = require('express');
const router = express.Router();
const { getEntireHistory, setHistory, deleteEntireHistory, deleteHistory } = require("../controllers/historyController")
const { protect } = require('../middleware/authMiddleware')


router.route('/')
    .get(protect, getEntireHistory)
    .post(protect, setHistory)
    // .delete(protect, deleteEntireHistory)
// router.route('/:id')
//     .delete(protect, deleteHistory)

module.exports = router
