import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const program = await prisma.program.findFirst({
    where: { isLive: true },
    orderBy: { startTime: 'desc' }
  });

  if (!program) return NextResponse.json({ error: 'No active program' }, { status: 404 });

  return NextResponse.json(program);
}
