"use server";

import Event, { IEvent } from "@/database/event.model";
import connectDB from "../mongodb";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });
    const similiarEvents = await Event.find({ _id: { $ne: event?._id }, tags: { $in: event?.tags } }).lean<IEvent[]>();
    return similiarEvents;
  } catch (error) {
    return [];
  }
}
