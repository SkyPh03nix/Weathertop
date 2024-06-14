const getStations = require("../models/weatherStation");

const dashboard = {
    async index(request, response) {
        try{
            const weatherStations = await getStations.getAllStationsWithLatestReading();
            const viewData = {
                title: "Dashboard",
                weatherStations: weatherStations
            };
            response.render("dashboard", viewData);  
        } catch (error) {
            console.error("Unable to fetch dashboard data: ", error);
        }
        
        //TODO error handling
    },
}

module.exports = dashboard;