// app/api/store/products/route.ts
import { prisma } from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
