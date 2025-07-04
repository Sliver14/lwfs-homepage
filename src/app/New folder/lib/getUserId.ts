// lib/getUserId.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getUserIdFromCookie(request: NextRequest): string | null {
  const token = request.cookies.get('authToken')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}
