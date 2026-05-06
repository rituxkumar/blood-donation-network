import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Request from "@/src/models/Request";
import Donor from "@/src/models/Donor";
import jwt from "jsonwebtoken";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

    const { requestId } = await req.json();

    const requestData = await Request.findById(requestId);
    if (!requestData) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // 🔥 Update Donor Stats
    await Donor.findByIdAndUpdate(decoded.id, {
      $inc: { 
        totalUnitsDonated: requestData.units,
        donationsCount: 1 
      }
    });

    const updated = await Request.findByIdAndUpdate(
      requestId,
      {
        acceptedBy: decoded.id,
        status: "accepted",
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      request: updated,
    });

  } catch (error) {
    return NextResponse.json({ error: "Server error" });
  }
}