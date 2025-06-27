// app/api/livetv/comments/route.ts
import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';
import { getUserIdFromCookie } from '@/lib/getUserId';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  const program = await prisma.program.findFirst({ where: { isLive: true } });
  if (!program) return NextResponse.json({ error: 'No live program' }, { status: 404 });

  const comments = await prisma.comment.findMany({
    where: { programId: program.id },
    include: { user: { select: { firstName: true, lastName: true } } },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromCookie(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { content } = await request.json();

  const program = await prisma.program.findFirst({ where: { isLive: true } });
  if (!program) return NextResponse.json({ error: 'No live program' }, { status: 404 });

  const comment = await prisma.comment.create({
    data: {
      userId,
      programId: program.id,
      content
    }
  });

  return NextResponse.json(comment);
}
