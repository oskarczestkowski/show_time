// Registration Endpoint
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();
    if (!email || !password || !role) {
      return new NextResponse(
        JSON.stringify({ error: "Email, password, and role are required" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Register user
    const result = await db.register(email, password, role);
    if (!result) {
      throw new Error("Registration failed");
    }

    // Authenticate user after registration
    const authResult = await db.authenticate(email, password);
    if (!authResult || !authResult.token) {
      throw new Error("Authentication failed");
    } else {
      console.log("auth worked")
    }


    console.log(authResult.token + "1")
    
    // Return the authentication token
    return NextResponse.json({
      ...result,
      authToken: authResult.token
    });
  } catch (err: any) {
    console.error("Error during registration:", err);
    return new NextResponse(
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
