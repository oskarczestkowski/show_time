import db from '@/app/db';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();
    if (!email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const result = await db.register(email, password, role);

    if (!result) {
      throw new Error("Registration failed");
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Error during registration:", err);
    return new Response(
      JSON.stringify({ error: err.message || "An unexpected error occurred" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
