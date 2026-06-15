const db = require('../config/database');

const Producer = {
    create: async (producerData) => {
        const [result] = await db.execute('INSERT INTO producers (name, description, location) VALUES (?, ?, ?)', 
            [producerData.name, producerData.description, producerData.location]);
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
        await db.execute('UPDATE producers SET name = ?, description = ?, location = ? WHERE id = ?', 
            [producerData.name, producerData.description, producerData.location, id]);
    },

    delete: async (id) => {
        await db.execute('DELETE FROM producers WHERE id = ?', [id]);
    }
};

module.exports = Producer;