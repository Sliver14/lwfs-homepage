// app/api/programs/route.ts
import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const programs = await prisma.program.findMany({
    orderBy: { startTime: 'desc' }
  });

  return NextResponse.json(programs);
}
