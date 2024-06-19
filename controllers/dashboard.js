const station = require("../models/weatherStation");
const user = require("./user");

const dashboard = {
    async index(request, response) {
        try{
            const userId = await user.getCurrentUser(request);
            const weatherStations = await station.getUserStationsWithLatestReading(userId);
            const viewData = {
                title: "Dashboard",
                weatherStations: weatherStations
            };
            response.render("dashboard", viewData);  
        } catch (error) {
            console.error("Unable to fetch dashboard data: ", error);
        }
    },
}

module.exports = dashboard;