const station = require('../models/weatherStation');

const weatherStation = {
  async index(request, response) {
      // Wetterstationen aus dem Modell abruf
      const stationId = request.params.id
      const stationValues = await station.getStationWithAllReadings(stationId); 
      //TODO latest reading uebergeben ohne redundanz in objektuebergabe? 
      
      const viewData = {
        title: stationValues.name,
        stationValues: stationValues, 
      }; 
      // Die Wetterstationsdaten an die View übergeben und rendern 
      response.render("weatherstation", viewData);
      console.log(stationValues);
  }
  //TODO error handling
};

module.exports = weatherStation;
