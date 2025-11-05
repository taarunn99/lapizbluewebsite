// src/app/api/reviews/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // Check if environment variables are set
  if (!placeId || !apiKey) {
    return NextResponse.json(
      {
        error: 'Missing API configuration',
        message: 'Please set GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY in .env.local'
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      {
        next: { revalidate: 300 } // Revalidate every 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status}`);
    }

    return NextResponse.json({
      reviews: data.result?.reviews || [],
      rating: data.result?.rating || 0,
      totalReviews: data.result?.user_ratings_total || 0
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
