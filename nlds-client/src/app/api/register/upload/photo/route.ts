import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/backend/db/prisma";
import { GoogleDriveClient } from "@/lib/backend/integrations/google-drive";
import { env } from "@/lib/config/env";

const driveClient = new GoogleDriveClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Validate MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, JPEG, PNG, or WEBP images are accepted." },
        { status: 400 },
      );
    }

    // Validate Size (4 MB max)
    const MAX_SIZE = 4 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Profile photo must be 4 MB or smaller." },
        { status: 400 },
      );
    }

    const uniqueSuffix = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    const extension = file.name.split(".").pop() || "jpg";
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .substring(0, 20);
    const fileName = `NLDS26_PHOTO_${uniqueSuffix}_${cleanName}.${extension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!env.GOOGLE_DRIVE_PHOTO_FOLDER_ID) {
      console.error("[Upload] Photo Folder ID not configured in .env");
      return NextResponse.json(
        { error: "Server Configuration Error: Missing Drive Folder ID" },
        { status: 500 },
      );
    }

    const fileId = await driveClient.uploadFile(
      buffer,
      fileName,
      file.type,
      env.GOOGLE_DRIVE_PHOTO_FOLDER_ID,
    );
    const fileLink = `https://drive.google.com/file/d/${fileId}/view`;

    return NextResponse.json(
      {
        success: true,
        message: "Profile photo uploaded successfully",
        fileId: fileLink,
        fileName: file.name,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("[Photo Upload Error]", error?.message || error);
    console.error(
      "[Photo Upload Stack]",
      error?.stack || "No stack trace available",
    );
    return NextResponse.json(
      {
        error:
          "An internal server error occurred while uploading. Please try again.",
      },
      { status: 500 },
    );
  }
}
