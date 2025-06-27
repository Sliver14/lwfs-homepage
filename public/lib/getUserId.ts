import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function getUserIdFromCookie(): string | null {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}
