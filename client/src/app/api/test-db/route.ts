import { mongoose } from 'mongoose';
import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";



export async function GET() {
  try {
    await connectDB();

    const state = mongoose.connection.readyState;

    /*
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
    */

    return NextResponse.json({
      success: true,
      status: state === 1 ? "connected" : "not connected",
      readyState: state,
    });

  } catch (error) {
          console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
  
      },
      { status: 500 }
    );
  }
}