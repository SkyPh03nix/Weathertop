const user = require("./user");

const home = {
    index(request, response) {
        const viewData = {
            title: "Weathertop",
            user: request.session.user
        };
        response.render("index", viewData)
    }
};

module.exports = home;