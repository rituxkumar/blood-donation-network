import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Donor from "@/src/models/Donor";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const donor = await Donor.findById(decoded.id).select("-password");

    return NextResponse.json({ success: true, donor });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}