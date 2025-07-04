import { prisma } from '../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromHeader } from '../../../../lib/getUserId';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: Record<string, unknown> = {};
    if (activeOnly) {
      where.isActive = true;
      where.date = {
        gte: new Date() // Only future events
      };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: {
        date: 'asc' // Sort by date ascending
      },
      take: limit,
      skip: offset
    });

    return NextResponse.json(events);
  } catch (error: unknown) {
    console.error('GET /api/events: Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromHeader(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, date, minister, platform, time, imageUrl, link, isActive = true } = body;

    // Validate required fields
    if (!title || !date || !minister || !platform || !time) {
      return NextResponse.json(
        { error: 'Title, date, minister, platform, and time are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        minister,
        platform,
        time,
        imageUrl,
        link,
        isActive
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/events: Error creating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 