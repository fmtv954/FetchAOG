import { NextResponse } from 'next/server';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const zoom = searchParams.get('zoom') || '10';
  const width = searchParams.get('width') || '600';
  const height = searchParams.get('height') || '400';

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lon},${lat},${zoom},0/${width}x${height}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`;

  return NextResponse.json({ url: mapboxUrl });
}

