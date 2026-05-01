import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Request from "@/src/models/Request";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

   const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const requests = await Request.find({
      hospitalId: decoded.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
