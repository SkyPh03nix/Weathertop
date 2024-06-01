const station = require('../models/weatherStation');

const weatherStation = {
  async index(req, res) {
      // Wetterstationen aus dem Modell abrufen
      const weatherStations = await station.getAllStations(); //TODO later use getUserStations()
      
      // Die Wetterstationsdaten an die View übergeben und rendern
      res.render("dashboard", { weatherStations });
  }
};

module.exports = weatherStation;
