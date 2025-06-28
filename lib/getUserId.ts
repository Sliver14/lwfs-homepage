import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getUserIdFromHeader(request: NextRequest): string | null {
  // Get the Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;

  // Expecting format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}