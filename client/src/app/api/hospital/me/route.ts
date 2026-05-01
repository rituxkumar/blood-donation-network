import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Hospital from "@/src/models/Hospital";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const hospital = await Hospital.findById(decoded.id).select("-password");

    return NextResponse.json({
      success: true,
      hospital,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}