// models/userStore.js
const db = require("./database");

const user = {
    async getUserById(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM weathertop_users WHERE EMAIL = ?`;
            db.get(query, [email], (err, row) => {
                if (err) return reject(err);
                if (row) {
                    console.log(`Found user ${row.EMAIL}`);
                    resolve({
                        id: row.EMAIL,
                        first_name: row.FIRST_NAME,
                        last_name: row.LAST_NAME
                    });
                } else {
                    resolve(undefined);
                }
            });
        });
    },

    async addUser(userData) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO weathertop_users (EMAIL, PASSWORD, FIRST_NAME, LAST_NAME)
                VALUES (?, ?, ?, ?)
            `;
            const values = [
                userData.email,
                userData.password,
                userData.first_name,
                userData.last_name
            ];
            db.run(query, values, function(err) {
                if (err) {
                    console.error("Error adding user: ", err);
                    return reject(err);
                }
                console.log(`User ${userData.email} added successfully`);
                resolve(this.lastID);
            });
        });
    },

    async authenticateUser(email, password) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM weathertop_users WHERE EMAIL = ? AND PASSWORD = ?
            `;
            db.get(query, [email, password], (err, row) => {
                if (err) return reject(err);
                if (row) {
                    resolve({
                        id: row.EMAIL,
                        first_name: row.FIRST_NAME,
                        last_name: row.LAST_NAME
                    });
                } else {
                    console.log("returning undefined in userStore.js");
                    resolve(null);
                }
            });
        });
    }
};

module.exports = user;
