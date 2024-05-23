const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const weatherstation = require("./controllers/weatherstation.js");

router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get("/weatherstation/:id", weatherstation.index);

module.exports = router;