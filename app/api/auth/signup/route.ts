import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/lib/models/SignUp"; // Adjust import path
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import syncDatabase from "@/lib/syncDatabase";

export async function POST(req: NextRequest) {
    try {
        await syncDatabase(); // Sync the database on server start
        
        const { firstName, lastName, phoneNumber, zone, church, country, email } = await req.json() as {
            firstName: string;
            lastName: string;
            phoneNumber?: string;
            zone?: string;
            church?: string;
            country?: string;
            email: string;
          };

        if (!firstName || !email) {
            return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
        }
        
        const user = await SignUp.findOne({where: {email}}) as InstanceType<typeof SignUp> | null;


        if (user) {
            if (user.getDataValue("verified")
            ) {
                return NextResponse.json({ error: "User already verified" }, { status: 400 });
            } else {
                return NextResponse.json({ error: "User not verified. Check your email." }, { status: 400 });
            }
        }

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedCode = bcrypt.hashSync(verificationCode, 10);

        // Create user in DB
        await SignUp.create({
            firstName, lastName, phoneNumber, zone, church, email, country,
            verificationCode: hashedCode, verified: false
        });

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send verification email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Verification Code",
            html: `
                <p>Hello ${firstName},</p>
                <p>Your verification code is: <b>${verificationCode}</b></p>
                <p>Please use this code within 15 minutes to verify your email address.</p>
                <p>Thanks,<br>Loveworld Foundation School Inc.</p>
             `,
        });

        return NextResponse.json({ message: "Check your email for verification code" }, { status: 201 });

    } catch (error) {
        console.error("Error during signup:", error); // Log the error for debugging
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
