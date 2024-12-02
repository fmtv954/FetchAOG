const api = require('../utils/api');

exports.getWeatherData = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const weatherData = await api.getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

