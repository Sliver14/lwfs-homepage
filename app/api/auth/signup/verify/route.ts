import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/lib/models/SignUp"; // Adjust import path
import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// verify code & signup
export async function POST(req: NextRequest) {
    try {
      await sequelize.sync(); // Ensure database is synced
      const { email, code } = await req.json();

      // Find the record based on email and code
      const record = await SignUp.findOne({ where: { email } });
  
      // Check if the record exists and if the code is not expired
      if (!record) {
        return NextResponse.json({ error: "User not found" }, {status:400});
      }
  
      // compare provided code
      const isMatch = bcrypt.compareSync(code, record.verificationCode);
  
      if (!isMatch){
        return NextResponse.json({error: 'invalid code'}, {status:400});
      }
  
       //set data to null
       await SignUp.update(
        {verificationCode: "", verified: "true"},
        {where:{email}}
      )
      
      // Send success response
      return NextResponse.json({ message: "Signup was Successfull!"}, {status: 200});
    } catch (error) {
      console.error("Error during code verification:", error);
      return NextResponse.json({ error: "An error occurred during verification" }, {status: 500});
    }
  }