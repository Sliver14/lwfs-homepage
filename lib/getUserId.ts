import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function getUserIdFromHeader(request: NextRequest): string | null {
  let token: string | null = null;

  // First try to get token from Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // If no Authorization header, try to get token from cookies
  if (!token) {
    const authToken = request.cookies.get('authToken');
    if (authToken) {
      token = authToken.value;
    }
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return decoded.id;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}