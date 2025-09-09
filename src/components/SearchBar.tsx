"use client";
import { useEffect } from "react";
import { useEventStore } from "@/store/eventStore";

export default function SearchBar() {
  const { search, from, to, setSearch, setFrom, setTo, resetFilters } = useEventStore();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        resetFilters();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [resetFilters]);

  return (
    <form
      className="flex flex-col md:flex-row gap-4 mb-6"
      onSubmit={(e) => e.preventDefault()}
      role="search"
      aria-label="Event search form"
    >
      <div className="flex-1">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search by Event Name
        </label>
        <input
          id="search"
          type="text"
          role="searchbox"
          aria-label="Search events by name"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type event name..."
          tabIndex={0}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>


      <div className="flex-1">
        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
          From
        </label>
        <input
          id="from"
          type="date"
          role="textbox"
          aria-label="Start date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          tabIndex={0}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <input
          id="to"
          type="date"
          role="textbox"
          aria-label="End date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          tabIndex={0}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>

      {/* Reset 按钮 */}
      <div className="flex items-end">
        <button
          type="button"
          onClick={resetFilters}
          role="button"
          aria-label="Reset search filters"
          aria-keyshortcuts="Escape"
          tabIndex={0}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  );
}