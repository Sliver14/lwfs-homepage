import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response with cleared cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Clear the authentication cookie
    response.cookies.set('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0) // Set to past date to expire immediately
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
} 