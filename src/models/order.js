const mysql = require('mysql2');
const db = require('../config/database');

const Order = {
    create: (orderData, callback) => {
        const query = 'INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)';
        db.query(query, [orderData.user_id, orderData.product_id, orderData.quantity, orderData.status], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    getById: (orderId, callback) => {
        const query = 'SELECT * FROM orders WHERE id = ?';
        db.query(query, [orderId], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM orders';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    updateStatus: (orderId, status, callback) => {
        const query = 'UPDATE orders SET status = ? WHERE id = ?';
        db.query(query, [status, orderId], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.affectedRows);
        });
    }
};

module.exports = Order;