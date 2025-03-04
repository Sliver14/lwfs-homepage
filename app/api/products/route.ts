import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/lib/models";
import syncDatabase
from "@/lib/syncDatabase";

export async function POST(req: NextRequest) {
    try{
        await syncDatabase(); // Sync the database on server start

        type Color = {
            name: string;
            hex: string;
          };

        const { name, description, price, imageUrl, colors } = await req.json() as {
            name: string;
            description: string;
            price: number;
            imageUrl: string;
            colors: Color[];
        }

        // Save product to the database
        const product = await Products.create({
            name,
            description,
            price,
            imageUrl, // Ensure field names match your DB schema
            colors, // Since colors is JSON, Sequelize will store it as an array of objects
        });

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}