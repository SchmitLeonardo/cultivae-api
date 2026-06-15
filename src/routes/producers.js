const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');

// Route to get all producers
router.get('/', producerController.getAllProducers);

// Route to get a specific producer by ID
router.get('/:id', producerController.getProducerById);

// Route to get products by a specific producer ID
router.get('/:id/products', producerController.getProductsByProducerId);

module.exports = router;