import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Attendance } from "@/lib/models"; // Adjust this path based on your project structure

export async function POST(req: NextRequest) {
  try {
    // Get token from cookies
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    const userId = decoded.id;

    // Extract request body properly
    const { groupParticipation } = await req.json();

    // Find the attendance record for the user
    const attendance = await Attendance.findOne({ where: { userId } });

    if (!attendance) {
      return NextResponse.json({ message: "Attendance record not found" }, { status: 400 });
    }

    // Update the attendance record
    await attendance.update({
      groupParticipation: groupParticipation || attendance.groupParticipation, // Keep old value if undefined
    });

    return NextResponse.json(
      { message: "Attendance updated successfully", attendance },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Attendance:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
