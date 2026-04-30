import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Hospital from "@/src/models/Hospital";
import { connectDB } from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      password,
      contactNumbers,
      address,
      location,
      image,
    } = body;

    // 🔴 basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password required" },
        { status: 400 }
      );
    }

    const existing = await Hospital.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Hospital already exists" },
        { status: 400 }
      );
    }

    // 🔐 hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ only allowed fields
    const hospital = await Hospital.create({
      name,
      email,
      password: hashed,
      contactNumbers,
      address,
      location,
      image,
    });

    return NextResponse.json({
      success: true,
      hospital,
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}