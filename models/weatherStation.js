const database = require("./database.js");
const stationValues = require("./stationValues")

const weatherStation = { 
  async getAllStations() {
    const query = "SELECT * FROM weatherstation;";
    try {
      const result = await database.getClient().query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all stations:', error);
      throw error;
    }
  },

  async getAllStationsWithLatestReading() {
    // TODO loop instead of query more readable, maybe slower??
    try{
      const stations = await this.getAllStations(); 
      const stationsWithLatestReading = await Promise.all(stations.map(async(station) => {
        const latestReading = await stationValues.getLatestReading(station.id);
        return {
          ...station,
          latestReading
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
      return {
        ...station,
        allReadings
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
      const result = await database.getClient().query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching the weather station with ID ${id}:", error);
      throw error;
    }
  },

  //TODO getUserStations(email)

  async removeStation(id) {
    //TODO
    const query = "DELETE FROM weatherstation WHERE id = $1";
    const values = [id];
    try{
      await database.getClient().query(query, values);
    } catch {
      console.error("Unable to remove weather station with ID ${id}:", error);
      throw error;
    }
  },

  async addStation(station) {
    //TODO
    const query = "INSERT INTO weatherstation (location, latitude, longitude, user_id) VALUES ($1, $2)";
    const values = [station.location, station.latitude, station.longitude]; //TODO current userid 
    try{
      await database.getClient().query(query, values);
    } catch {
      console.error("Unable to add weather station:", error);
      throw error;
    }
  }

};
module.exports = weatherStation;