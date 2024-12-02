import { NextResponse } from 'next/server';
import axios from 'axios';

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flightNumber');
  const date = searchParams.get('date');

  if (!flightNumber || !date) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
      params: {
        access_key: AVIATIONSTACK_API_KEY,
        flight_iata: flightNumber,
        date: date
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: 500 });
  }
}

