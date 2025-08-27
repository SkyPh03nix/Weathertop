// controllers/user.js
const users = require('../models/userStore.js');

const user = {

    // Login-Seite anzeigen
    login(request, response) {
        const viewData = { title: "Login" };
        response.render("login", viewData);
    },

    // Logout
    logout(request, response) {
        request.session.destroy((err) => {
            if (err) console.error("Error destroying session:", err);
            response.redirect("/");
        });
    },

    // Signup-Seite anzeigen
    signup(request, response) {
        const viewData = { title: "Signup" };
        response.render("signup", viewData);
    },

    // Aktuellen User aus der Session holen
    async getCurrentUser(request) {
        if (!request.session.user) return null;

        try {
            const userData = await users.getUserById(request.session.user);
            return userData || null; // gibt das gesamte User-Objekt zurück
        } catch (err) {
            console.error("Error fetching current user:", err);
            return null;
        }
    },

    // Neuen User registrieren
    async register(request, response) {
        try {
            const newUser = {
                email: request.body.email,
                password: request.body.password,
                first_name: request.body.first_name,
                last_name: request.body.last_name
            };
            await users.addUser(newUser);
            request.session.user = newUser.email; // Session direkt setzen
            console.log(`User ${newUser.email} registered successfully`);
            response.redirect("/dashboard");
        } catch (err) {
            console.error("Error registering user:", err);
            response.status(500).send("Server error");
        }
    },

    // User authentifizieren
    async authenticate(request, response) {
        try {
            const userData = await users.authenticateUser(request.body.email, request.body.password);
            if (userData) {
                request.session.user = userData.id; // Session korrekt setzen
                console.log(`User ${userData.id} successfully authenticated`);
                response.redirect("/dashboard");
            } else {
                console.log("Authentication failed: wrong email or password");
                response.redirect("/login");
            }
        } catch (err) {
            console.error("Error authenticating user:", err);
            response.status(500).send("Server error");
        }
    }
};

module.exports = user;
