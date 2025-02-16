export const runtime = "nodejs"; // Add this at the top

import { NextRequest, NextResponse } from "next/server";
import Comment from "@/lib/models/Comment";
import SignUp from "@/lib/models/SignUp";
import sequelize from "@/lib/sequelize";
import jwt from "jsonwebtoken";

// Fetch Live-tv comment
export async function GET(req: NextRequest) {
    try {
        const comments = await Comment.findAll({
            include: [
                {
                    model: SignUp, // Include the associated model
                    as: "user", // Alias must match the one defined in the association
                    attributes: ['firstName'], // Specify the fields you want to include
                },
            ],
            order: [['createdAt', 'DESC']], // Sort comments by creation date
        });
        return NextResponse.json(comments, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Could not fetch comments' }, {status: 500});
    }
    };