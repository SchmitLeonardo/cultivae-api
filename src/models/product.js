const db = require('../config/database');

const Product = {
    create: (productData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO products (name, description, price, producer_id) VALUES (?, ?, ?, ?)';
            db.query(query, [productData.name, productData.description, productData.price, productData.producer_id], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products';
            db.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    },

    update: (id, productData) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE products SET name = ?, description = ?, price = ?, producer_id = ? WHERE id = ?';
            db.query(query, [productData.name, productData.description, productData.price, productData.producer_id, id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM products WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Product;