const station = require('../models/weatherStation');
const values = require('../models/stationValues');

const weatherStation = {
  async index(request, response) {
      // Wetterstationen aus dem Modell abruf
      const stationId = request.params.id
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
  }
  //TODO error handling
};

module.exports = weatherStation;
