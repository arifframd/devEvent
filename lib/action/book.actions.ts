"use server";
import Booking from "@/database/booking.model";
import connectDB from "../mongodb";

export const eventBooked = async (eventId: string, email: string) => {
  try {
    await connectDB();
    await Booking.create({ eventId, email });
    return { success: true };
  } catch (error) {
    console.log("Error during booking event:", error);
    return { success: false };
  }
};
