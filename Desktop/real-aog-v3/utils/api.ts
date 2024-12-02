const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-heroku-app-name.herokuapp.com';
import axios from 'axios';

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

export interface FlightData {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    baggage: string;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
  };
  aircraft: {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
  };
  live: {
    updated: string;
    latitude: number;
    longitude: number;
    altitude: number;
    direction: number;
    speed_horizontal: number;
    speed_vertical: number;
    is_ground: boolean;
  };
}

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export async function getFlightData(flightNumber: string, date: string): Promise<FlightData[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/flights`, {
      params: {
        flightNumber,
        date
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/weather`, {
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
}

export async function getMapboxStaticImage(lat: number, lon: number, zoom: number, width: number, height: number): Promise<string> {
  return `${API_BASE_URL}/api/map?lat=${lat}&lon=${lon}&zoom=${zoom}&width=${width}&height=${height}`;
}

export async function getAirportCoordinates(airportCode: string): Promise<{ lat: number, lon: number } | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/map/geocode`, {
      params: {
        access_token: MAPBOX_ACCESS_TOKEN,
        types: 'airport'
      }
    });
    
    if (response.data.features && response.data.features.length > 0) {
      const [lon, lat] = response.data.features[0].center;
      return { lat, lon };
    }
    return null;
  } catch (error) {
    console.error('Error fetching airport coordinates:', error);
    return null;
  }
}

const api = {
  getFlightData,
  getWeatherData,
  getMapboxStaticImage,
  getAirportCoordinates
};

export default api;

