import { NextRequest, NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import SignUp from "@/lib/models/SignUp"; 

export async function POST(req: NextRequest) {
    try {
      const { email } = await req.json();
  
      // Basic validation
      if (!email) {
        return NextResponse.json({ error: 'Email is required.' }, {status: 400});
      }
  
      // Find the user by email
      const user = await SignUp.findOne({ where: { email } });
  
      // If user doesn't exist
      if (!user) {
        return NextResponse.json({ error: 'User not found.' }, {status: 400});
      } 
      
      if(user.verified === false ){
        return NextResponse.json({error: 'user not verified'}, {status: 400});
      }
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
    // Set the cookie manually using headers
    const response = NextResponse.json({ message: "Signin was Successful!", token });

    response.headers.set(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=None; Max-Age=${30 * 24 * 60 * 60}`
    );

    return response;
    
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, {status:500});
    }
  };