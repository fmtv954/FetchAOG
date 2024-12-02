const api = require('../utils/api');

exports.getMapData = async (req, res) => {
  try {
    const { lat, lon, zoom, width, height } = req.query;
    const mapUrl = await api.getMapboxStaticImage(lat, lon, zoom, width, height);
    res.json({ url: mapUrl });
  } catch (error) {
    console.error('Error generating map data:', error);
    res.status(500).json({ error: 'Failed to generate map data' });
  }
};

