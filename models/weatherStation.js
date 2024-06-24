const db = require("./database.js");
const stationValues = require("./stationValues");
const mapping = require("../utils/mapping.js");
const compare = require("../utils/compare.js");

const weatherStation = { 
  async getAllStations() {
    const query = "SELECT * FROM weatherstation;";
    try {
      const result = await db.getClient().query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all stations:', error);
      throw error;
    }
  },

  async getStationsByUserId(userId) {
    const query = 'SELECT * FROM weatherstation WHERE user_id = $1';
    const values = [userId];
    try {
        let result = await db.getClient().query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error fetching stations for user:", error);
        throw error;
    }
},

  async getUserStationsWithLatestReading(userId) {
    try{
      const stations = await this.getStationsByUserId(userId);
      const stationsWithLatestReading = await Promise.all(stations.map(async(station) => {
        const allReadings = await stationValues.getAllReadings(station.id);
        const latestReadings = await stationValues.get2LatestReadings(allReadings);
        const minMaxValues = await compare.getMinMaxValues(allReadings);
        const trends = await compare.getTrend(latestReadings);
        
        const latestReadingWithTrends = {
          ...latestReadings[0],
          trends
        };

        let weatherInfo = null;
        if (latestReadings.length != 0) {
          weatherInfo = mapping.getWeatherInfo(latestReadings[0].weather_code, latestReadings[0].wind_direction);
        } else {
          weatherInfo = mapping.getWeatherInfo(0, -1);
        }
        
        return {
          stationValues: {
            ...station,
            minMaxValues,
            latestReading: {
              ...latestReadingWithTrends,
              ...weatherInfo
            }
          }
        };
      }));

    return stationsWithLatestReading;
    } catch(error) {
      console.error("Error fetching all stations and their latest Readings:", error);
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
    
      let weatherInfo = null;
      if (latestReadings.length != 0) {
        weatherInfo = mapping.getWeatherInfo(latestReadings[0].weather_code, latestReadings[0].wind_direction);
      } else {
        weatherInfo = mapping.getWeatherInfo(0, -1);
      }

      return {
        id: station.id,
        name: station.name,
        latitude: station.latitude,
        longitude: station.longitude,
        user_id: station.user_id,
        allReadings,
        minMaxValues,
        latestReading: {
          ...latestReadings[0],
          trends,
          ...weatherInfo
        },
      };
    } catch (error) {
      console.error("Error fetching station and all readings:", error);
      throw error;
    }
  },

  async getStation(id) {
    const query = 'SELECT * FROM weatherstation WHERE id = $1';
    const values = [id];
    try {
      const result = await db.getClient().query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching the weather station with ID ${id}:", error);
      throw error;
    }
  },

  async deleteStation(id) {
    const query = "DELETE FROM weatherstation WHERE id = $1";
    const values = [id];
    try{
      await db.getClient().query(query, values);
    } catch {
      console.error("Unable to remove weather station with ID ${id}:", error);
      throw error;
    }
  },

  async addStation(station) { 
    console.log("Func: addStation(station): station:" , station);
    
    const query = "INSERT INTO weatherstation (name, latitude, longitude, user_id) VALUES ($1, $2, $3, $4)";
    const values = [station.name, station.latitude, station.longitude, station.userId]; 
    try{
      await db.getClient().query(query, values);
    } catch {
      console.error("Unable to add weather station:", error);
      throw error;
    }
  }
};

module.exports = weatherStation;