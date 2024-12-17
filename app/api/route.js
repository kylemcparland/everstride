import db from "@/db/connection";
import { NextResponse } from "next/server";

// Generic GET to DB:
export async function GET(req) {
  try {
    // Parse query string from req URL...
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    // If no query in req...
    if (!query) {
      return NextResponse.json({
        success: false,
        message: "Missing query parameter",
        status: 400,
      });
    }

    // Success! Execute the given query...
    const result = await db.query(query);
    return NextResponse.json({ success: true, data: result.rows, status: 200 });

    // Or return the error...
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      status: 500,
    });
  }
}