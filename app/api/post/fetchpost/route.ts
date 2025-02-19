import { NextResponse } from "next/server";
import Post from "@/lib/models/Post"; 
import syncDatabase from "@/lib/syncDatabase";

export async function GET() {
    try{
        await syncDatabase();
        const listOfPosts = await Post.findAll();
        return NextResponse.json(listOfPosts);
    } catch(error){
        console.error("Error fetching posts:", error); // Logs the error
        return NextResponse.json({error: "server error"}, {status: 500});
    }
}