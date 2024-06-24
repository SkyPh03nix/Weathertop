const weatherCodeMap = {
    Thunderstorm: { condition: "Thunderstorm", iconFilename: "bi bi-cloud-lightning" },
    Drizzle: { condition: "Drizzle", iconFilename: "bi bi-cloud-drizzle" },
    Rain: { condition: "Rain", iconFilename: "bi bi-cloud-rain" },
    Snow: { condition: "Snow", iconFilename: "bi bi-snow2" },
    Atmosphere: { condition: "Atmosphere", iconFilename: "bi bi-cloud-fog2" },
    Clear: { condition: "Clear", iconFilename: "bi bi-brightness-high" },
    Clouds: { condition: "Clouds", iconFilename: "bi bi-clouds" },
    Unknown: { condition: "-", iconFilename: "bi bi-question-square" }
};
  
const getWeatherInfo = (code, direction) => {

    if (code >= 200 && code < 300) {
      weatherInfo = weatherCodeMap.Thunderstorm;
    } else if (code >= 300 && code < 400) {
      weatherInfo = weatherCodeMap.Drizzle;
    } else if (code >= 500 && code < 600) {
      weatherInfo = weatherCodeMap.Rain;
    } else if (code >= 600 && code < 700) {
      weatherInfo = weatherCodeMap.Snow;
    } else if (code >= 700 && code < 800) {
      weatherInfo = weatherCodeMap.Atmosphere;
    } else if (code === 800) {
      weatherInfo = weatherCodeMap.Clear;
    } else if (code > 800 && code <= 900) {
      weatherInfo = weatherCodeMap.Clouds;
    } else {
      weatherInfo = weatherCodeMap.Unknown;
    }
  const windDirection = getWindDirection(direction);
  return { ...weatherInfo, windDirection };
};

const getWindDirection = (degrees) => {
  if (degrees >= 0 && degrees < 22.5) {
    return "North";
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "North East";
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "East";
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "South East";
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "South";
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "South West";
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "West";
  } else if (degrees >= 292.5 && degrees < 337.5) {
    return "North West";
  } else if (degrees >= 337.5 && degrees <= 360) {
    return "North";
  } else {
    return "-";
  }
};
  
module.exports = { getWeatherInfo, getWindDirection };