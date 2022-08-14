const express = require('express');
const router = express.Router();
const { getUserChannel } = require('../controllers/channelController')


router.route('/:id').get(getUserChannel)

module.exports = router
