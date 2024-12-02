const api = require('../utils/api');

exports.getFlightData = async (req, res) => {
  try {
    const { flightNumber, date } = req.query;
    const flightData = await api.getFlightData(flightNumber, date);
    res.json(flightData);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
};

