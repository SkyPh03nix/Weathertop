const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./weathertop.sqlite", (err) => {
    if (err) {
        console.error("❌ SQLite DB konnte nicht geöffnet werden:", err);
    } else {
        console.log("✅ SQLite DB verbunden");
    }
});

// Tabellen erstellen, falls sie noch nicht existieren
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS weathertop_users (
        email TEXT PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS weatherstation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        user_id TEXT,
        FOREIGN KEY(user_id) REFERENCES weathertop_users(email) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS station_values (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        weatherstation_id INTEGER NOT NULL,
        weather_code INTEGER,
        temperature REAL,
        wind_speed REAL,
        wind_direction REAL,
        air_pressure INTEGER,
        data_time TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(weatherstation_id) REFERENCES weatherstation(id) ON DELETE CASCADE
    )`);
});

module.exports = db;