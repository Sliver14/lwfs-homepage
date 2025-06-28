import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma'; // Assuming this path is correct now with your alias

export async function GET(
  req: NextRequest,
  // MODIFIED: Treating params as a Promise to satisfy the compiler error
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // MODIFIED: Awaiting params to extract the id
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    // If the error is related to awaiting params, it might be caught here.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}