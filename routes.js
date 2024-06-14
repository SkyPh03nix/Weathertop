const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const weatherstation = require("./controllers/weatherstation.js");

router.get("/", home.index);
router.get("/dashboard", dashboard.index); 
router.get("/weatherstation/:id", weatherstation.index); 

router.post('/stations/add', weatherstation.addStation); 
router.get("/weatherstation/:id/deletestation", weatherstation.deleteStation); 

router.post('/stations/:id/readings', weatherstation.addReading); 
router.get('/weatherstation/:id/deletereading/:readingId', weatherstation.deleteReading);

module.exports = router;