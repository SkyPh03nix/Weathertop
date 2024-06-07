const station = require('../models/weatherStation');
const values = require('../models/stationValues');

const weatherStation = {
  async index(request, response) {
      // Wetterstationen aus dem Modell abruf
      const stationId = request.params.id;
      const stationValues = await station.getStationWithAllReadings(stationId);
      const latestReading = await values.getLatestReading(stationId);
      //TODO latest reading und name uebergeben ohne redundanz in objektuebergabe? 
      
      const viewData = {
        //TODO rework object, redundant and badly structured
        title: stationValues.name,
        name: stationValues.name,
        stationValues: stationValues,
        latestReading: latestReading
      }; 
      response.render("weatherstation", viewData);
      console.log(viewData);
  },
  //TODO error handling

  async addStation(request, response) {
    const stationId = request.params.id;
    const newStation = {
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      //TODO userID
    };
    await weatherStation.addStation(stationId, newStation);
  },

  async addReading(request, response) {
    const stationId = request.params.id;
    console.log(stationId);
    const newReading = {
      weatherStationId: stationId,
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
      response.status(500).send("An error occurred while adding the reading.");
    }
  }
  
};

module.exports = weatherStation;