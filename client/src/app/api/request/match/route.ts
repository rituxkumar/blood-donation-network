import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Request from "@/src/models/Request";
import Donor from "@/src/models/Donor";
import Hospital from "@/src/models/Hospital"; // 🔥 Register Hospital model for refs
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const donor = await Donor.findById(decoded.id);

    if (!donor) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    console.log("Donor blood group:", donor.bloodGroup);

    // 🔥 ESCAPE REGEX SPECIAL CHARACTERS (like '+')
    const escapedBloodGroup = donor.bloodGroup.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 🔥 MATCHING LOGIC (Improved: Trimmed & Case-Insensitive & Escaped)
    const requests = await Request.find({
      bloodGroup: { $regex: new RegExp(`^${escapedBloodGroup}$`, "i") },
      status: "pending",
    })
    .populate("hospitalId", "name address contactNumbers location image")
    .sort({ createdAt: -1 });

    console.log(`Found ${requests.length} matching requests for ${donor.bloodGroup}`);

    return NextResponse.json({
      success: true,
      requests,
    });

  } catch (error: any) {
    console.error("Match API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Server error" 
    }, { status: 500 });
  }
}