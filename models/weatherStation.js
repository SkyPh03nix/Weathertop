const db = require("./database.js");
const stationValues = require("./stationValues")

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
    // TODO loop instead of query more readable, maybe slower??
    try{
      const stations = await this.getStationsByUserId(userId); 
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
      const result = await db.getClient().query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching the weather station with ID ${id}:", error);
      throw error;
    }
  },

  //TODO getUserStations(email)

  async deleteStation(id) {
    //TODO
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