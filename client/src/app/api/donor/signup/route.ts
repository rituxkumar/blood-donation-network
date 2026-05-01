import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/src/lib/db";
import Donor from "@/src/models/Donor";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password } = body;

    const existing = await Donor.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "Donor already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const donor = await Donor.create({
      ...body,
      password: hashed,
    });

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