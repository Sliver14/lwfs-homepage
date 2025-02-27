import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/lib/models/SignUp"; // Adjust import path
// import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

interface RequestBody {
  id: number;
  email: string;
  verified: boolean;
  verificationCode?: string;
}

// resend-code
export async function POST(req: NextRequest) {  
    try {
      const { email } = (await req.json()) as RequestBody;
      
      // Find the record based on email and code
      const record = await SignUp.findOne({ where: { email } });
  
      // Check if the record exists and if the code is not expired
      if (!record) {
        return NextResponse.json({ error: "User not found" }, {status: 400});
      }
  
    //   if (record?.getDataValue('verified') === true){
    //     return NextResponse.json({message: "User already verified"}, {status: 200})
    //   }
  
      // Generate a 6 didgits verification code
      const generateVerificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit number
    
      // Hash the verification code before saving
      const hashedCode = await bcrypt.hash(generateVerificationCode, 10);
  
      // Send the code via email
      const transporter = nodemailer.createTransport({
        service: "gmail", // or another email provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // consider using environment variables
        },
      });
  
      // transport the code via email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Verification Code",
        // text: `Your verification code is: ${generateVerificationCode}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .code {
              font-size: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <p>Hello,</p>
          <p>Your verification code is:</p>
          <p class="code">${generateVerificationCode}</p>
          <p>Please use this code within 15 minutes to verify your email address.</p>
          <p>Thanks,<br>Loveworld Foundation School Inc.</p>
        </body>
        </html>
      `,
      });
  
      //update verification code to database
      await SignUp.update(
        {verificationCode: hashedCode},
        {where:{email}}
      )
  
      // Send success response
      return NextResponse.json({ message: "Check your email for verification code"}, {status: 200});
    } catch (error) {
      console.error("Error during code verification:", error);
      return NextResponse.json({ error: "An error occurred during verification" }, {status: 500});
    }
  };