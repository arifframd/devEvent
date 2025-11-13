"use client";
import { eventBooked } from "@/lib/action/book.actions";
// import { eventBooked } from "@/lib/action/book.actions";
import posthog from "posthog-js";
import React, { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = await eventBooked(eventId, email);

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, email, slug });
    } else {
      console.log("Booking failed");
      posthog.captureException("Event booking failed");
    }
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input className="bg-dark-200 rounded-[6px] px-5 py-2.5" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email address" />
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
