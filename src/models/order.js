const db = require('../config/database');

const Order = {
    create: async (orderData) => {
        const [result] = await db.execute(
            'INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)',
            [orderData.user_id, orderData.product_id, orderData.quantity, orderData.status || 'pending']
        );

        return result.insertId;
    },

    getById: async (orderId) => {
        const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);
        return rows[0];
    },

    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM orders');
        return rows;
    },

    updateStatus: async (orderId, status) => {
        const [result] = await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
        return result.affectedRows;
    },

    delete: async (orderId) => {
        const [result] = await db.execute('DELETE FROM orders WHERE id = ?', [orderId]);
        return result.affectedRows;
    },
};

module.exports = Order;
