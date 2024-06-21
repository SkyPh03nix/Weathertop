const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const weatherstation = require("./controllers/weatherstation.js");
const user = require("./controllers/user.js");

const auth = require("./utils/auth.js");

router.get("/", auth.guest, home.index);

router.get("/login", auth.guest, user.login);
router.get("/logout", user.logout);
router.get("/register", auth.guest, user.signup);
router.post("/register", user.register)
router.post("/authenticate", user.authenticate);

router.get("/dashboard", auth.protected, dashboard.index); 
router.get("/weatherstation/:id", auth.protected, weatherstation.index); 

router.post('/stations/add', auth.protected, weatherstation.addStation); 
router.get("/weatherstation/:id/deletestation", auth.protected, weatherstation.deleteStation); 

router.post('/stations/:id/readings', auth.protected, weatherstation.addReading); 
router.get('/weatherstation/:id/deletereading/:readingId', auth.protected, weatherstation.deleteReading);

module.exports = router;