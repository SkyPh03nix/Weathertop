const station = require('../models/weatherStation');

const weatherStation = {
  async index(request, response) {
      // Wetterstationen aus dem Modell abruf
      const stationID = request.params.id
      const weatherStation = await station.getStation(stationID);
      const viewData = {
        title: weatherStation.name,
        weatherStation: weatherStation
      }; 
      // Die Wetterstationsdaten an die View übergeben und rendern
      response.render("weatherstation", viewData);
  }
};

module.exports = weatherStation;
