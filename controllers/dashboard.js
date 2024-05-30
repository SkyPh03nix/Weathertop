const getWeatherStations = require("../models/weatherStation");

const dashboard = {
    async index(request, response) {
        const weatherStations = await getWeatherStations();
            const viewData = {
            title: "Dashboard",
            weatherStations: weatherStations
        };
        response.render("dashboard", viewData);
    },
    
    async addStation(request, response){
        //TODO
        response.redirect("/dashboard");
    },

    async deleteStation(request, response){
        //TODO
        response.redirect("/dashboard");
    }
}

module.exports = dashboard;