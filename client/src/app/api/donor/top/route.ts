import { connectDB } from "@/src/lib/db";
import Donor from "@/src/models/Donor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch top 5 donors sorted by totalUnitsDonated descending
    const donors = await Donor.find({})
      .sort({ totalUnitsDonated: -1 })
      .limit(5)
      .select("name location bloodGroup image donationsCount totalUnitsDonated");

    return NextResponse.json({
      success: true,
      donors,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
