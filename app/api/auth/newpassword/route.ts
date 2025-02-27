import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/lib/models/SignUp"; // Adjust import path
// import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";

interface RequestBody {
  id: number;
  email: string;
  password: string;
}

// resend-code
export async function POST(req: NextRequest) {  
    try {
      const { email, password } = (await req.json()) as RequestBody;
      
      // Find the record based on email and code
      const record = await SignUp.findOne({ where: { email } });
  
      // Check if the record exists and if the code is not expired
      if (!record) {
        return NextResponse.json({ error: "User not found" }, {status: 400});
      }
  
      // Hash the password code before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
  
      //update verification code to database
      await SignUp.update(
        {password: hashedPassword},
        {where:{email}}
      )
  
      // Send success response
      return NextResponse.json({ message: "Check your email for verification code"}, {status: 200});
    } catch (error) {
      console.error("Error during code verification:", error);
      return NextResponse.json({ error: "An error occurred during verification" }, {status: 500});
    }
  };