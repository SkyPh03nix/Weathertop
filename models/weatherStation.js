//TODO later db connection
const getWeatherStations = async () => {
//Static Data for now
  return [
    {
      id: 1,
      location: "Rettenbach",
      weather_code: 800,
      temperature: 20,
      wind: 10,
      pressure: 1000
    },
    {
      id: 2,
      location: "Regensburg",
      weather_code: 800,
      temperature: 18,
      wind: 20,
      pressure: 1000
    },
    {
      id: 3,
      location: "München",
      weather_code: 800,
      temperature: 22,
      wind: 15,
      pressure: 1000
    }
  ];
};

module.exports = getWeatherStations;