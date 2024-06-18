const users = require('../models/userStore.js');

const user = {
    login(request, response) {
        const viewData = {
            title: "Login"
        };
        response.render("login", viewData);
    },

    logout(request, response) {
        request.session.destroy();
        response.redirect("/");
    },

    signup(request, response) {
        const viewData = {
            title: "Signup"
        };
        response.render("signup", viewData);
    },

    async getCurrentUser(request, response) {
        return await users.getUserById(request.session.body);
    }, 

    async register(request, response) {
        await users.addUser(request.body);
        response.redirect("/");
    },

    async authenticate(request,response) {
        let user = await users.authenticateUser(request.body.email, request.body.password);
        if (user) {
            request.session.user = user.id;
            
            console.log("User successfully Authenticated");
            response.redirect("/dashboard");
        } else {
            response.redirect("/");
        }
    }
}

module.exports = user; 