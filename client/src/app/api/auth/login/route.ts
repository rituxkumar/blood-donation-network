import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Hospital from "@/src/models/Hospital";
import { connectDB } from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // check user
    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    // check password
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // create token
    const token = jwt.sign(
      { id: hospital._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      hospital,
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}