import { NextRequest, NextResponse } from "next/server";
import Comment from "@/lib/models/Comment";
import sequelize from "@/lib/sequelize";
import jwt from "jsonwebtoken";
import syncDatabase from "@/lib/syncDatabase";
await syncDatabase(); // Sync the database on server start

export async function POST(req: NextRequest) {
  try {
    await syncDatabase();

    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;

    const body = await req.json();
    const { content } = body;

    if (!content || content.trim() === "") {
      return NextResponse.json({ message: "Comment cannot be empty" }, { status: 400 });
    }

    const newComment = await Comment.create({ userId, content });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not post comment" }, { status: 500 });
  }
}
