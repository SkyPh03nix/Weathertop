const station = require('../models/weatherStation');
const values = require('../models/stationValues');
const { deleteStation } = require('./dashboard');
const stationValues = require('../models/stationValues');

const weatherStation = {
  async index(request, response) {
      // Wetterstationen aus dem Modell abruf
      const stationId = request.params.id;
      const stationValues = await station.getStationWithAllReadings(stationId);
      const latestReading = await values.getLatestReading(stationId);
      
      const viewData = {
        //TODO rework object, redundant and badly structured
        title: stationValues.name, //TODO only used for tab name, use stationValues.name instead
        name: stationValues.name,
        stationValues: stationValues,
        latestReading: latestReading
      }; 
      response.render("weatherstation", viewData);
      console.log(viewData);
  },
  //TODO error handling

  async addStation(request, response) {
    const newStation = { 
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      //TODO userID
    }; 
    try {
      await station.addStation(newStation);
      response.redirect(`/dashboard`);
    } catch (error) {
      console.error("Error adding station:", error);
    }
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    try {
      await station.deleteStation(stationId);
      response.redirect('/dashboard');
    } catch (error) {
      console.error("Error deleting station: ", error);
    }
  },

  async addReading(request, response) { 
    const stationId = request.params.id; 
    const newReading = {
      stationId: stationId,
      weatherCode: request.body.weather_code,
      temperature: request.body.temperature,
      windSpeed: request.body.wind_speed,
      windDirection: request.body.wind_direction,
      airPressure: request.body.air_pressure,
    }
    try {
      await values.addReading(newReading);
      response.redirect(`/weatherstation/${stationId}`);
    } catch (error) {
      console.error("Error adding reading:", error);
    }
  },

  async deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    
    console.log(`/////////////Params: ${request.params.readingId}///////////////`)
    console.log(`/////////////${readingId}///////////////`)

    try {
      await stationValues.deleteReading(readingId);
      response.redirect(`/weatherstation/${stationId}`);
    } catch (error) {
      console.error("Error deleting reading:", error);
    }
  } 
};

module.exports = weatherStation;