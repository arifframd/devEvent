import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
import { events } from "@/lib/constants";
import { cacheLife } from "next/cache";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  // Fetch events from the API
  "use cache";
  cacheLife("hours");
  // const res = await fetch(`${BASE_URL}/api/event`);
  // const { events } = await res.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Cant Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conference, All in One Place</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events &&
            events.length > 0 &&
            events.map((event) => (
              <li key={event.slug}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
