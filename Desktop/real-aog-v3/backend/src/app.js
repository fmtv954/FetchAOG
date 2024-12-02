require('dotenv').config();
const express = require('express');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const mapRoutes = require('./routes/mapRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/flight', flightRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/map', mapRoutes);

app.get('/', (req, res) => {
  res.send('Real AOG Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

