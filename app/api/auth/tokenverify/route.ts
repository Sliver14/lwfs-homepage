import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/lib/models/SignUp"; 
import jwt from "jsonwebtoken";

// Token verification route
export async function GET(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value; // Get token correctly
  
    if (!token) {
      return NextResponse.json({ valid: false, error: "Token is required" }, {status: 400});
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
      const email = decoded.email;
  
      const user = await SignUp.findOne({where:{email}});
      
      if (!user) {
        return NextResponse.json({message: 'user not found'}, {status: 404});
      }
  
      return NextResponse.json({
        valid: true, 
        user:{ 
          id: user.getDataValue("id"),
          firstName: user.getDataValue("firstName"),
          lastName: user.getDataValue("lastName"),
          email: user.getDataValue("email"),
          zone: user.getDataValue("zone"),
          
        },
     }, {status: 200});

    } catch (error) {
      console.error("Error during code verification:", error); // Logs the error
        return NextResponse.json({ valid: false, error: "Invalid or expired token" }, {status: 403});
    }
  };