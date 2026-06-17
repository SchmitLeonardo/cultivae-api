const db = require('../config/database');
const { toSqlValue } = require('../utils/helpers');

const User = {
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    create: async ({ username, email, password, role = 'consumer' }) => {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [toSqlValue(username), toSqlValue(email), toSqlValue(password), toSqlValue(role)]
        );

        return result.insertId;
    },
};

module.exports = User;
