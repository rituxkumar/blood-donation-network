import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Donor from "@/src/models/Donor";
import { connectDB } from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const donor = await Donor.findOne({ email });

    if (!donor) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, donor.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: donor._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      donor,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}