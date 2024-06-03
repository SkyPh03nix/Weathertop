const db = require('./database.js');

const stationValues = {
  async getLatestReading(stationId) {
    const query = `
      SELECT weather_code, temperature, wind_speed, air_pressure, data_time FROM station_values
        WHERE weatherstation_id = ${stationId} ORDER BY data_time DESC LIMIT 1;
    `;

    try {
      const result = await db.getClient().query(query);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching latest reading for weather station with ID ${stationId}:`, error);
      throw error;
    }
  },

  async getAllReadings(stationId) {
    const query = `
      SELECT * FROM station_values
        WHERE weatherstation_id = ${stationId} ORDER BY data_time DESC;
    `;

    try {
      const result = await db.getClient().query(query);
      return result.rows;
    } catch (error) {
      console.error(`Error fetching all readings for weather station with ID ${stationId}:`, error);
      throw error;
    }
  }
};

module.exports = stationValues;