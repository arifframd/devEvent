import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const formData = await req.formData();
    let event;

    try {
      // Object.fromEntries berfungsi untuk mengubah FormData menjadi objek biasa
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({ message: "Invalid JSON data", error: e instanceof Error ? e.message : "Unknown event error" }, { status: 400 });
    }

    // unggah gambar ke Cloudinary
    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      return NextResponse.json({ message: "Image file is required" }, { status: 400 });
    }

    // // Parsing tags and agenda from JSON strings
    // const tags = JSON.parse(formData.get("tags") as string);
    // const agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image", folder: "DevEvent_Images" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createEvent = await Event.create({
      ...event,
    });

    return NextResponse.json({ message: "Event created successfully", event: createEvent }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Event creation failed", error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch events", error }, { status: 500 });
  }
};
