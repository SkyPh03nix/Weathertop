// models/weatherStation.js
const db = require("./database");
const stationValues = require("./stationValues");
const mapping = require("../utils/mapping");
const compare = require("../utils/compare");

const weatherStation = {

  async getAllStations() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM weatherstation";
      db.all(query, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  async getStationsByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM weatherstation WHERE user_id = ?";
      db.all(query, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  async getUserStationsWithLatestReading(userId) {
    try {
      const stations = await this.getStationsByUserId(userId);
      const stationsWithLatestReading = await Promise.all(
        stations.map(async (station) => {
          const allReadings = await stationValues.getAllReadings(station.id);
          const latestReadings = await stationValues.get2LatestReadings(allReadings);
          const minMaxValues = await compare.getMinMaxValues(allReadings);
          const trends = await compare.getTrend(latestReadings);

          const latestReadingWithTrends = latestReadings.length ? { ...latestReadings[0], trends } : null;

          let weatherInfo = latestReadings.length
            ? mapping.getWeatherInfo(latestReadings[0].weather_code, latestReadings[0].wind_direction)
            : mapping.getWeatherInfo(0, -1);

          return {
            stationValues: {
              ...station,
              minMaxValues,
              latestReading: latestReadingWithTrends ? { ...latestReadingWithTrends, ...weatherInfo } : null
            }
          };
        })
      );

      return stationsWithLatestReading;
    } catch (error) {
      console.error("Error fetching all stations and their latest readings:", error);
      throw error;
    }
  },

  async getStationWithAllReadings(stationId) {
    try {
      const station = await this.getStation(stationId);
      const allReadings = await stationValues.getAllReadings(stationId);
      const latestReadings = await stationValues.get2LatestReadings(allReadings);
      const trends = compare.getTrend(latestReadings);
      const minMaxValues = await compare.getMinMaxValues(allReadings);

      let weatherInfo = latestReadings.length
        ? mapping.getWeatherInfo(latestReadings[0].weather_code, latestReadings[0].wind_direction)
        : mapping.getWeatherInfo(0, -1);

      return {
        id: station.id,
        name: station.name,
        latitude: station.latitude,
        longitude: station.longitude,
        user_id: station.user_id,
        allReadings,
        minMaxValues,
        latestReading: latestReadings.length ? { ...latestReadings[0], trends, ...weatherInfo } : null
      };
    } catch (error) {
      console.error("Error fetching station and all readings:", error);
      throw error;
    }
  },

  async getStation(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM weatherstation WHERE id = ?";
      db.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async deleteStation(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM weatherstation WHERE id = ?";
      db.run(query, [id], function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  async addStation(station) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO weatherstation (name, latitude, longitude, user_id) VALUES (?, ?, ?, ?)";
      const values = [station.name, station.latitude, station.longitude, station.userId];
      db.run(query, values, function(err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  }
};

module.exports = weatherStation;
