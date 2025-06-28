// app/api/livetv/participate/route.ts
import { getUserIdFromHeader  } from '../../../../../lib/getUserId';
import { prisma } from '../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const userId = getUserIdFromHeader (request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const program = await prisma.program.findFirst({ where: { isLive: true } });
  if (!program) return NextResponse.json({ error: 'No live program' }, { status: 404 });

  await prisma.userProgram.upsert({
    where: {
      userId_programId: {
        userId,
        programId: program.id,
      },
    },
    update: {},
    create: {
      userId,
      programId: program.id,
      participated: true,
    },
  });

  return NextResponse.json({ message: 'Participation recorded' });
}
