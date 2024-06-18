// /app/api/users/updateAvatar.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
  try {
    const { userId, avatarUrl } = await request.json();

    if (!userId || !avatarUrl) {
      return new NextResponse(
        JSON.stringify({ error: "User ID and Avatar URL are required" }),
        { status: 400 }
      );
    }

    await db.client.collection("users").update(userId, { avatar: avatarUrl });

    return new NextResponse(
      JSON.stringify({ success: true, message: "Avatar updated successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message || "Failed to update avatar" }),
      { status: 500 }
    );
  }
}
