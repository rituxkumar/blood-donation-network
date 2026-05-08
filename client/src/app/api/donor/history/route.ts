import { connectDB } from "@/src/lib/db";
import Donor from "@/src/models/Donor";
import RequestModel from "@/src/models/Request";
import Hospital from "@/src/models/Hospital";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const donorId = searchParams.get("donorId");

    if (!donorId) {
      return NextResponse.json(
        { success: false, error: "donorId parameter is required" },
        { status: 400 }
      );
    }

    // Fetch the specific donor details
    const donor = await Donor.findById(donorId).select(
      "name bloodGroup image donationsCount totalUnitsDonated location phone createdAt"
    );

    if (!donor) {
      return NextResponse.json(
        { success: false, error: "Donor not found" },
        { status: 404 }
      );
    }

    // Fetch donation history (requests accepted/fulfilled by this donor)
    // Populate hospital details to show which hospital received the blood
    const history = await RequestModel.find({ acceptedBy: donorId })
      .sort({ updatedAt: -1 })
      .populate({
        path: "hospitalId",
        select: "name email contactNumbers address location image",
        model: Hospital,
      });

    return NextResponse.json({
      success: true,
      donor,
      history,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
