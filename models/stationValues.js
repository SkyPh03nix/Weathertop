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
  },

  async addReading(reading) { 
    const query = `INSERT INTO station_values (weatherstation_id, weather_code, temperature, wind_speed, wind_direction, air_pressure, data_time)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`;
    const values = [reading.stationId, reading.weatherCode, reading.temperature, reading.windSpeed, reading.windDirection, reading.airPressure]
    try {
      await db.getClient().query(query, values);
    } catch (error) {
      console.error('Error adding reading to the database:', error);
      throw error;
    }
  },

  async deleteReading(readingId) {
    const query = "DELETE FROM station_values WHERE id=$1";
    const values = [readingId];
    try {
      await db.getClient().query(query, values);
    } catch (error) {
      console.error("Error deleting reading from database: ", error);
      throw error;
    }
    
  }
};

module.exports = stationValues;