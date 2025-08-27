// models/stationValues.js
const db = require("./database");

const stationValues = {
  
  async getLatestReading(stationId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM station_values WHERE weatherstation_id = ? ORDER BY data_time DESC LIMIT 1
      `;
      db.get(query, [stationId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async get2LatestReadings(allReadings) {
    try {
      return allReadings.slice(0, 2);
    } catch (error) {
      console.error('Error getting latest two readings:', error);
      throw error;
    }
  },

  async getAllReadings(stationId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM station_values WHERE weatherstation_id = ? ORDER BY data_time DESC
      `;
      db.all(query, [stationId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  async addReading(reading) { 
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO station_values
        (weatherstation_id, weather_code, temperature, wind_speed, wind_direction, air_pressure, data_time)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      const values = [
        reading.stationId,
        reading.weatherCode,
        reading.temperature,
        reading.windSpeed,
        reading.windDirection,
        reading.airPressure
      ];
      db.run(query, values, function(err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  },

  async deleteReading(readingId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM station_values WHERE id = ?";
      db.run(query, [readingId], function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};

module.exports = stationValues;