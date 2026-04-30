import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export const runtime = "nodejs"; // 🔥 VERY IMPORTANT

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
    });

    return NextResponse.json({
      success: true,
      url: response.url,
      fileId: response.fileId,
    });

  } catch (error: any) {
    console.log("UPLOAD ERROR:", error); // 🔴 MUST SEE THIS
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}