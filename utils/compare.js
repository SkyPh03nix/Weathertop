const stationValues = require("../models/stationValues")

const getTrend = (readings) => {
    const trends = {
        temperature: "",
        wind_speed: "",
        air_pressure: ""
      };

    // are there enough measurements to compare?
    if (Object.keys(readings).length < 2) {
      return trends; //no icons are shown for empty strings
    }

    const latestReading = readings[0];
    const secondLatestReading = readings[1];

    if (latestReading.temperature > secondLatestReading.temperature) {
      trends.temperature = "bi bi-arrow-up-right";
    } else if (latestReading.temperature < secondLatestReading.temperature) {
      trends.temperature = "bi bi-arrow-down-right";
    } else {
      trends.temperature = "bi bi-arrow-right";
    }
  
    if (latestReading.wind_speed > secondLatestReading.wind_speed) {
      trends.wind_speed = "bi bi-arrow-up-right";
    } else if (latestReading.wind_speed < secondLatestReading.wind_speed) {
      trends.wind_speed = "bi bi-arrow-down-right";
    } else {
      trends.wind_speed = "bi bi-arrow-right";
    }
  
    if (latestReading.air_pressure > secondLatestReading.air_pressure) {
      trends.air_pressure = "bi bi-arrow-up-right";
    } else if (latestReading.air_pressure < secondLatestReading.air_pressure) {
      trends.air_pressure = "bi bi-arrow-down-right";
    } else {
      trends.air_pressure = "bi bi-arrow-right";
    }

    return trends;
  };

  async function getMinMaxValues(allReadings) {
    try {
      const readingsArray = Object.values(allReadings);
      
     if (readingsArray.length == 1) {
        return { tempMin: readingsArray[0].temperature, tempMax: readingsArray[0].temperature, windMin: readingsArray[0].wind_speed, 
          windMax: readingsArray[0].wind_speed, airMin: readingsArray[0].air_pressure, airMax: readingsArray[0].air_pressure}
      } else if (readingsArray.length == 0) {
        return { tempMin: "-", tempMax: "-", windMin: "-", windMax: "-", airMin: "-", airMax: "-"}; 
      }
  
      const tempMin = readingsArray.reduce((min, reading) => Math.min(min, reading.temperature), Infinity);
      const tempMax = readingsArray.reduce((max, reading) => Math.max(max, reading.temperature), -Infinity);
  
      const windMin = readingsArray.reduce((min, reading) => Math.min(min, reading.wind_speed), Infinity);
      const windMax = readingsArray.reduce((max, reading) => Math.max(max, reading.wind_speed), -Infinity);
  
      const airMin = readingsArray.reduce((min, reading) => Math.min(min, reading.air_pressure), Infinity);
      const airMax = readingsArray.reduce((max, reading) => Math.max(max, reading.air_pressure), -Infinity);
  
      //console.log("getMinMaxValues:", minTemperature, maxTemperature, minWindSpeed, maxWindSpeed, minAirPressure, maxAirPressure);
      return {
        tempMin: tempMin,
        tempMax: tempMax, 
        windMin: windMin, 
        windMax: windMax, 
        airMin: airMin, 
        airMax: airMax 
      };
    } catch (error) {
      console.error("Error fetching min/max values for station readings:", error);
      throw error;
    }
  }
  
  module.exports = { getTrend, getMinMaxValues };