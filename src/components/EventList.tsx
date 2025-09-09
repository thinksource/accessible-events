"use client";

import { useQuery } from "@tanstack/react-query";
import { useEventStore } from "@/store/eventStore";
interface EventDTO {
  organisation: string;
  type: string;
  event: string;
  date: string;
  location: string;
  district: string;
}
interface Event {
  organisation: string;
  type: string;
  event: string;
  date: Date | null;
  location: string;
  district: string;
}

async function fetchEvents(): Promise<Event[]> {
  const res = await fetch("/events.json");
  if (!res.ok) throw new Error("Failed to fetch events");
  const data : EventDTO[] = await res.json();

  return data.map((e: EventDTO) => {
    const parsedDate = new Date(e.date);
    return {
      ...e,
      date: isNaN(parsedDate.getTime()) ? null : parsedDate, // no validate date null
    };
  });
}

export default function EventList() {
  const { search, from, to } = useEventStore();
  const { data: events, isLoading, isError } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p role="alert" className="text-red-500">Failed to load events.</p>;

  const filtered = events?.filter((e) => {
    const matchSearch = e.event.toLowerCase().includes(search.toLowerCase());

    const matchFrom = from ? e.date && e.date >= new Date(from) : true;
    const matchTo = to ? e.date && e.date <= new Date(to) : true;

    return matchSearch && matchFrom && matchTo;
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Event list">
      {filtered && filtered.length > 0 ? (
        filtered.map((e, idx) => (
          <article
            key={idx}
            role="article"
            aria-labelledby="event-title"
            aria-describedby="event-date event-org event-type event-location"
            className="rounded-lg border p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold" aria-label="Event title">{e.event}</h2>
            <p className="text-sm text-gray-600">
              <span className="sr-only">Event date: </span>
              {e.date ? e.date.toDateString() : "Date unavailable"}
            </p>
            <p className="mt-1 text-sm">
              <span className="font-medium">Organisation:</span> {e.organisation}
            </p>
            <p className="text-sm">
              <span className="font-medium">Type:</span> {e.type}
            </p>
            <p className="text-sm">
              <span className="font-medium">Location:</span> {e.location},{" "}
              {e.district}
            </p>
          </article>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No events found
        </p>
      )}
    </div>
  );
}