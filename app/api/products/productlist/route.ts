import { NextResponse } from "next/server";
import { Products } from "@/lib/models";

export async function GET() {
    try{

        const productlist = await Products.findAll();

        return NextResponse.json({ success: true, data: productlist }, { status: 201 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}