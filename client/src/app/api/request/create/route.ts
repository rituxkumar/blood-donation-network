import { NextResponse } from "next/server";
import Request from "@/src/models/Request";
import { connectDB } from "@/src/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { bloodGroup, units, urgency } = body;

    if (!bloodGroup || !units) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    // 🔥 GET TOKEN
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    // 🔥 VERIFY TOKEN
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // 🔥 SAVE WITH hospitalId
    const newRequest = await Request.create({
      bloodGroup,
      units,
      urgency,
      status: "pending",
      hospitalId: decoded.id, // ⭐ MOST IMPORTANT
    });

    return NextResponse.json({
      success: true,
      request: newRequest,
    });

  } catch (error) {
    console.log(error); // debug
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}