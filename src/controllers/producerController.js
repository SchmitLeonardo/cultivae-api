const Producer = require('../models/producer');

// Get all producers
exports.getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.findAll();
        res.status(200).json(producers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving producers', error });
    }
};

// Get producer by ID
exports.getProducerById = async (req, res) => {
    const { id } = req.params;
    try {
        const producer = await Producer.findById(id);
        if (producer) {
            res.status(200).json(producer);
        } else {
            res.status(404).json({ message: 'Producer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving producer', error });
    }
};

// Get products by producer ID
exports.getProductsByProducerId = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Producer.findProductsByProducerId(id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found for this producer' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};