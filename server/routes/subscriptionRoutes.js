const express = require('express');
const router = express.Router();
const { getSubscribersNumber, getIsSubscribed, setSubscribe, setUnsubscribe } = require('../controllers/subscriptionController')
const { protect } = require('../middleware/authMiddleware');



router.route('/subscribersNumber/:id').get(getSubscribersNumber)
router.route('/subscribed/:id').get(protect, getIsSubscribed)
router.route('/subscribe').post(protect, setSubscribe)
router.route('/unsubscribe').post(protect, setUnsubscribe)

module.exports = router
