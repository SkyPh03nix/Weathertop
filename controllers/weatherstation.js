const station = require('../models/weatherStation');
const values = require('../models/stationValues');
const { deleteStation } = require('./dashboard');
const stationValues = require('../models/stationValues');
const mapping = require("../utils/mapping.js");

const weatherStation = {
  async index(request, response) {
    //TODO object construction in model
      const stationId = request.params.id;
      const stationValues = await station.getStationWithAllReadings(stationId);
      const weatherInfo = mapping.getWeatherInfo(stationValues.allReadings[0].weather_code, stationValues.allReadings[0].wind_direction);

      const latestReading = {
        ...stationValues.allReadings[0],
        ...weatherInfo
      };

      const allReadingsWithWindDirections = stationValues.allReadings.map(reading => {
        const windDirection = mapping.getWindDirection(reading.wind_direction);
        return {
          ...reading,
          windDirection: windDirection
        };
      });

      const viewData = {
        title: stationValues.name,
        stationValues: {
          ...stationValues,
          allReadings: allReadingsWithWindDirections,
          latestReading: latestReading
        }
      }; 
      response.render("weatherstation", viewData);
  },

  async addStation(request, response) {
    console.log("addStation(request, response): user: ", request.session.user);
    const newStation = { 
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userId: request.session.user,
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
    try {
      await stationValues.deleteReading(readingId);
      response.redirect(`/weatherstation/${stationId}`);
    } catch (error) {
      console.error("Error deleting reading:", error);
    }
  } 
};

module.exports = weatherStation;