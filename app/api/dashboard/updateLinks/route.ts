// /app/api/users/updateSocialMediaLinks.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
  try {
    const { userId, socialMediaLinks } = await request.json();

    if (!userId || !socialMediaLinks) {
      return new NextResponse(
        JSON.stringify({ error: "User ID and social media links are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userRecord = await db.client.collection("users").update(userId, {
      social_media_links: socialMediaLinks,
    });

    return NextResponse.json({ success: true, user: userRecord });
  } catch (err: any) {
    console.error("Error updating social media links:", err);
    return new NextResponse(
      JSON.stringify({ error: err.message || "Failed to update social media links" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
