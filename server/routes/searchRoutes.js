const express = require('express');
const router = express.Router();
const { getAllResults } = require('../controllers/searchController')


router.route('/').post(getAllResults)

module.exports = router
