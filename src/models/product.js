const db = require('../config/database');
const { toSqlValue } = require('../utils/helpers');

const Product = {
    create: async (productData) => {
        const [result] = await db.execute(
            'INSERT INTO products (name, description, price, stock, producer_id) VALUES (?, ?, ?, ?, ?)',
            [
                toSqlValue(productData.name),
                toSqlValue(productData.description),
                toSqlValue(productData.price),
                toSqlValue(productData.stock),
                toSqlValue(productData.producer_id),
            ]
        );

        return result.insertId;
    },

    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    update: async (id, productData) => {
        const [result] = await db.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, producer_id = ? WHERE id = ?',
            [
                toSqlValue(productData.name),
                toSqlValue(productData.description),
                toSqlValue(productData.price),
                toSqlValue(productData.stock),
                toSqlValue(productData.producer_id),
                id,
            ]
        );

        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows;
    },
};

module.exports = Product;
