const db = require('../config/database');

const User = {
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    create: async ({ username, email, password, role = 'consumer' }) => {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );

        return result.insertId;
    },
};

module.exports = User;
