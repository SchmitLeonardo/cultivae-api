const Order = require('../models/order');
const { hasValue } = require('../utils/helpers');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { user_id, product_id, quantity, userId, productId } = req.body;
        const userIdValue = user_id || userId;
        const productIdValue = product_id || productId;

        if (!hasValue(userIdValue) || !hasValue(productIdValue) || !hasValue(quantity)) {
            return res.status(400).json({ message: 'user_id, product_id and quantity are required' });
        }

        const orderId = await Order.create({
            user_id: userIdValue,
            product_id: productIdValue,
            quantity,
        });

        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!hasValue(status)) {
            return res.status(400).json({ message: 'status is required' });
        }

        const affectedRows = await Order.updateStatus(id, status);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.getById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const affectedRows = await Order.delete(req.params.id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
