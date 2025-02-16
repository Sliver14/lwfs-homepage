import { NextRequest, NextResponse } from "next/server";
import SignUp from "@/lib/models/SignUp"; // Adjust import path
import sequelize from "@/lib/sequelize";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        await sequelize.authenticate(); // Ensure DB connection
    await sequelize.sync({ alter: true }); // Sync tables
        
        const { firstName, lastName, phoneNumber, zone, church, country, email } = await req.json();

        if (!firstName || !email) {
            return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
        }

        const user = await SignUp.findOne({ where: { email } });

        if (user) {
            if (user.verified) {
                return NextResponse.json({ error: "User already verified" }, { status: 400 });
            } else {
                return NextResponse.json({ error: "User not verified. Check your email." }, { status: 400 });
            }
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedCode = bcrypt.hashSync(verificationCode, 10);

        const newUser = await SignUp.create({
            firstName, lastName, phoneNumber, zone, church, email, country,
            verificationCode: hashedCode, verified: false
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Verification Code",
            html: `<p>Your verification code is: <b>${verificationCode}</b></p>`,
        });

        return NextResponse.json({ message: "Check your email for verification code" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
