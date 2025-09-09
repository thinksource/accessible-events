import SearchBar from "@/components/SearchBar";
import EventList from "@/components/EventList";
import { ReactQueryClientProvider } from "@/app/providers";

export default function Page() {
  return (
    <main id="main" className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6" aria-labelledby="searchTitle" role="region">Carers Events</h1>
      <ReactQueryClientProvider>
        <SearchBar />
        <EventList />
      </ReactQueryClientProvider>
    </main>
  );
}