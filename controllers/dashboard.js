const station = require("../models/weatherStation");
const user = require("./user");

const dashboard = {
    async index(request, response) {
        try{
            const currentUser = await user.getCurrentUser(request);
            if (!currentUser) {
                return response.redirect("/login");
            }
            const userId = currentUser.id;
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