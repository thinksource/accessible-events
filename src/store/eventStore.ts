import { create } from "zustand";

interface EventStore {
  search: string;
  from: string;  // yyyy-mm-dd
  to: string;    // yyyy-mm-dd
  setSearch: (value: string) => void;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  resetFilters: () => void;
}

export const useEventStore = create<EventStore>((set) => ({
  search: "",
  from: "",
  to: "",
  setSearch: (value) => set({ search: value }),
  setFrom: (value) => set({ from: value }),
  setTo: (value) => set({ to: value }),
  resetFilters: () => set({ search: "", from: "", to: ""  }),
}));