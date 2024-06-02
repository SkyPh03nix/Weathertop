const db = require("./database.js");

const weatherStationModel = { 
  async getAllStations() {
    // function only used for debugging and until login and registration is implemented
    //const query =  "SELECT * FROM weatherstation JOIN station_values ON weatherstation.id = station_values.weatherstation_id";
    const query = `
      SELECT * FROM weatherstation ws JOIN station_values sv ON ws.id = sv.weatherstation_id
      JOIN (
        SELECT weatherstation_id, MAX(data_time) AS max_time FROM station_values GROUP BY weatherstation_id
      )
      AS max_times ON sv.weatherstation_id = max_times.weatherstation_id AND sv.data_time = max_times.max_time;
    `;
    try{
      const result = await db.getClient().query(query);
      return result.rows;
    } catch(error) {
      console.error("Error fetching all stations:", error);
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

  async removeStation(id) {
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
    const query = "INSERT INTO weatherstation (location, user_id) VALUES ($1, $2)";
    const values = [station.location, station.userId];
    try{
      await db.getClient().query(query, values);
    } catch {
      console.error("Unable to add weather station:", error);
      throw error;
    }
  }

};
module.exports = weatherStationModel;