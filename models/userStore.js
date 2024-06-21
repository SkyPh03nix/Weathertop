const db = require("./database")

const user = {
    async getUserById(id) {
        const query = 'SELECT * FROM weathertop_users WHERE email = $1';
        const values = [id];
        try {
            let dbRes = await db.getClient().query(query, values);
            if (dbRes.rows[0] !== undefined) {
                console.log(`Found user ${dbRes.rows[0].email}`);
                return {
                    id: dbRes.rows[0].email,
                    firstName: dbRes.rows[0].first_name,
                    lastName: dbRes.rows[0].last_name
                };
            } else {
                return undefined;
            }
        } catch (error) {
            logger.error("Error getting user", error);
            return undefined;
        }
    },

    async addUser(userData) {
        const query = 'INSERT INTO weathertop_users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)';
        const values = [userData.email, userData.password, userData.first_name, userData.last_name];
        try {
            await db.getClient().query(query, values);
            console.log(`User ${userData.email} added successfully`);
        } catch (error) {
            console.log("Error adding user: ", error)
        }
    },

    async authenticateUser(email, password) {
        const query = 'SELECT * FROM weathertop_users WHERE email = $1 AND password = $2';
        const values = [email, password];
        try {
            let dbRes = await db.getClient().query(query, values);
            if (dbRes.rows[0] !== undefined) {
                return {
                    //TODO do i really need first and last name here?
                    id: dbRes.rows[0].email,
                    first_name: dbRes.rows[0].first_name,
                    last_name: dbRes.rows[0].last_name
                };
            } else {
                console.log("returning undefined in userStore.js"); //TODO fehlermeldung
                return null;
            }
        } catch(error) {
            console.log("Error in user authentification: ", error);
        }
    }
}

module.exports = user;
