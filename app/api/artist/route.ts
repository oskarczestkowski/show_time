import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  return new Response("Hello", { status: 200 });
  
}