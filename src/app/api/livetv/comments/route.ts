// app/api/livetv/comments/route.ts
import { prisma } from '../../../../../lib/prisma';
// import { NextResponse } from 'next/server';
import { getUserIdFromHeader } from '../../../../../lib/getUserId';
import { NextResponse, NextRequest } from 'next/server';
import { emitToProgramRoom } from '../../../../../lib/socketServer';

export async function GET() {
  try {
    const program = await prisma.program.findFirst({ where: { isLive: true } });
    if (!program) return NextResponse.json({ error: 'No live program' }, { status: 404 });

    const comments = await prisma.comment.findMany({
      where: { programId: program.id },
      include: { user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromHeader(request);
    if (!userId) {
      console.log('No userId found in request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required and must be a string' }, { status: 400 });
    }

    const program = await prisma.program.findFirst({ where: { isLive: true } });
    if (!program) {
      return NextResponse.json({ error: 'No live program' }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        userId,
        programId: program.id,
        content
      },
      include: { user: { select: { firstName: true, lastName: true } } }
    });

    // Emit socket event for real-time updates
    try {
      emitToProgramRoom(program.id, 'newMessage', {
        id: comment.id,
        text: comment.content,
        userId: comment.userId,
        programId: comment.programId,
        username: `${comment.user.firstName} ${comment.user.lastName}`,
        createdAt: comment.createdAt
      });
    } catch (socketError) {
      console.error('Error emitting socket event:', socketError);
      // Don't fail the request if socket emission fails
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
