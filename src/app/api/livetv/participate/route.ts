// app/api/livetv/participate/route.ts
import { getUserIdFromHeader } from '../../../../../lib/getUserId';
import { prisma } from '../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const userId = getUserIdFromHeader(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { groupParticipation } = body || {};

    // Get current live program
    const program = await prisma.program.findFirst({ 
      where: { isLive: true } 
    });

    if (!program) {
      return NextResponse.json({ error: 'No live program available' }, { status: 404 });
    }

    // Create or update user program participation
    await prisma.userProgram.upsert({
      where: {
        userId_programId: {
          userId,
          programId: program.id
        }
      },
      update: {
        participated: true,
        joinedAt: new Date()
      },
      create: {
        userId,
        programId: program.id,
        participated: true
      }
    });

    return NextResponse.json({ 
      message: 'Participation recorded successfully',
      groupParticipation: groupParticipation || 1
    });
  } catch (error) {
    console.error('Error recording participation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
