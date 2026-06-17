const db = require('../config/database');
const { toSqlValue } = require('../utils/helpers');

const Producer = {
    create: async (producerData) => {
        const [result] = await db.execute('INSERT INTO producers (name, description, contact_info) VALUES (?, ?, ?)',
            [toSqlValue(producerData.name), toSqlValue(producerData.description), toSqlValue(producerData.contact_info)]);
        return result.insertId;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM producers WHERE id = ?', [id]);
        return rows[0];
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM producers');
        return rows;
    },

    update: async (id, producerData) => {
        await db.execute('UPDATE producers SET name = ?, description = ?, contact_info = ? WHERE id = ?',
            [toSqlValue(producerData.name), toSqlValue(producerData.description), toSqlValue(producerData.contact_info), id]);
    },

    delete: async (id) => {
        await db.execute('DELETE FROM producers WHERE id = ?', [id]);
    },

    findProductsByProducerId: async (id) => {
        const [rows] = await db.execute('SELECT * FROM products WHERE producer_id = ?', [id]);
        return rows;
    }
};

module.exports = Producer;
