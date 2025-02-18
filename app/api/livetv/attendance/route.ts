import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Attendance, SignUp } from "@/lib/models"; // Adjust based on your project structure
import syncDatabase from "@/lib/syncDatabase";

export const runtime = "nodejs"; // Ensure API route runs on Node.js, not Edge

export async function POST(req: NextRequest) {
  try {
    await syncDatabase(); // Sync the database on server start

    // Extract token from cookies
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Access denied. No token provided." }, { status: 403 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
    if (!decoded.email) {
      return NextResponse.json({ error: "Invalid token." }, { status: 403 });
    }

    // Fetch user from database
    const user = await SignUp.findOne({ where: { email: decoded.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Extract request body
    const { page } = await req.json();

    // Check if the user has already registered
    const existingAttendance = await Attendance.findOne({ where: { userId: user.getDataValue("id") } });

    if (existingAttendance) {
      return NextResponse.json({ error: "Already Registered" }, { status: 400 });
    }

    // Store attendance
    await Attendance.create({
      userId: user.getDataValue("id"),
      firstName: user.getDataValue("firstName"),
      lastName: user.getDataValue("lastName"),
      zone: user.getDataValue("zone"),
      page,
      country: user.getDataValue("country"),
      email: user.getDataValue("email"),
      timestamp: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || "Unknown",

    });
    
    

    return NextResponse.json({ message: "Attendance recorded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error recording attendance:", error);
    return NextResponse.json({ message: "Failed to record attendance" }, { status: 500 });
  }
}
