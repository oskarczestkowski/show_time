// /app/api/users/updateBio.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
  try {
    const { userId, bio } = await request.json();

    if (!userId || !bio) {
      return new NextResponse(
        JSON.stringify({ error: "User ID and bio are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userRecord = await db.client.collection("users").update(userId, {
      bio,
    });

    return NextResponse.json({ success: true, user: userRecord });
  } catch (err: any) {
    console.error("Error updating bio:", err);
    return new NextResponse(
      JSON.stringify({ error: err.message || "Failed to update bio" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
