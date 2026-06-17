const db = require('../config/database');
const { hasValue, toSqlValue } = require('../utils/helpers');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, stock = 0, producer_id, producerId } = req.body;
    const producerIdValue = producer_id || producerId;

    if (!hasValue(name) || !hasValue(price) || !hasValue(producerIdValue)) {
        return res.status(400).json({ message: 'name, price and producer_id are required' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO products (name, description, price, stock, producer_id) VALUES (?, ?, ?, ?, ?)',
            [name, toSqlValue(description), price, stock, producerIdValue]
        );

        res.status(201).json({ id: result.insertId, name, description, price, stock, producer_id: producerIdValue });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    if (!hasValue(name) || !hasValue(price) || !hasValue(stock)) {
        return res.status(400).json({ message: 'name, price and stock are required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name, toSqlValue(description), price, stock, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
