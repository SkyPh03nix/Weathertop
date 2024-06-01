var pg = require("pg");

const connectionString = process.env.DB_CON_STRING;

if (!connectionString) {
    console.error("ERROR: environment variable DB_CON_STRING not set.");
    process.exit(1);
}

let dbClient = null;

const dataStore = {
    getClient() {
        if (dbClient) {
            return dbClient;
        } else {
            dbClient = new pg.Client(dbConfig);
            dbClient.connect();
            return dbClient;
        }
    },
    async closeClient() {
        await dbClient.end();
        dbClient = null;
    }
}

module.exports = database;