import { NextRequest, NextResponse } from "next/server";
import Post from "@/lib/models/Post";

export async function POST(req: NextRequest) {
    
    try{
        const body = await req.json();
        const { postPhoto, postTitle, postBody } = body;

        await Post.create({postPhoto, postTitle, postBody});
        
        return NextResponse.json({message: "Posted Successfully"}, {status: 200});
    } catch(error){
        console.error("Error fetching post:", error); // Logs the error
        return NextResponse.json({error: "Failed"}, {status: 500})
    }
}