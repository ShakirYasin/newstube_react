const express = require('express');
const router = express.Router();
const { setCollection, deleteAllCollections, getAllCollections, getSingleCollection, updateSingleCollection, deleteSingleCollection } = require('../controllers/collectionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllCollections).post(protect, setCollection).delete(protect, deleteAllCollections)
router.route('/:id').get(getSingleCollection).put(protect, updateSingleCollection).delete(protect, deleteSingleCollection)


 
module.exports = router