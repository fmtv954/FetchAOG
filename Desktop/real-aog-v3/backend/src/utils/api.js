const axios = require('axios');

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

exports.getFlightData = async (flightNumber, date) => {
  try {
    const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
      params: {
        access_key: AVIATIONSTACK_API_KEY,
        flight_iata: flightNumber,
        date: date
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};

exports.getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

exports.getMapboxStaticImage = async (lat, lon, zoom, width, height) => {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lon},${lat},${zoom},0/${width}x${height}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`;
};

