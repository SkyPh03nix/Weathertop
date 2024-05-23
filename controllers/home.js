const home = {
    index(req, res) {
        const viewData = {
            title: "Weathertop"
        };
        res.render("index", viewData)
    }
};

module.exports = home;