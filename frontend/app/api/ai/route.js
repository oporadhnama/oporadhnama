import { NextResponse } from 'next/server';

// Use Node.js runtime so Vercel allows up to 300s (edge max is 60s on Hobby plan)
export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request) {
  try {
    const body = await request.json();

    // Abort the upstream fetch after 270s — gives a clean error before Vercel kills the function
    const controller = new AbortController();
    const upstreamTimeout = setTimeout(() => controller.abort(), 270_000);

    let response;
    try {
      response = await fetch('https://unipy.onrender.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AI_API_KEY}`
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(upstreamTimeout);
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from AI service' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('AI API Error:', error);

    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'AI service timed out. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
