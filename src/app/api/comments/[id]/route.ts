// // app/api/comments/[id]/route.ts
// import { getUserIdFromCookie } from '@/lib/getUserId';
// import { prisma } from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';

// export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
//   const userId = getUserIdFromCookie();
//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const comment = await prisma.comment.findUnique({ where: { id: params.id } });

//   if (!comment || comment.userId !== userId) {
//     return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
//   }

//   await prisma.comment.delete({ where: { id: params.id } });

//   return NextResponse.json({ message: 'Comment deleted' });
// }

export async function DELETE(){

}
