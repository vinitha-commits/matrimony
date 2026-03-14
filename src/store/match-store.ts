import { create } from "zustand";
import type { MatchCard } from "@/types";

interface MatchState {
  dailyMatches: MatchCard[];
  newMatches: MatchCard[];
  starMatches: MatchCard[];
  shortlist: Set<string>;
  setDailyMatches: (matches: MatchCard[]) => void;
  setNewMatches: (matches: MatchCard[]) => void;
  setStarMatches: (matches: MatchCard[]) => void;
  toggleShortlist: (profileId: string) => void;
  isShortlisted: (profileId: string) => boolean;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  dailyMatches: [],
  newMatches: [],
  starMatches: [],
  shortlist: new Set(),
  setDailyMatches: (dailyMatches) => set({ dailyMatches }),
  setNewMatches: (newMatches) => set({ newMatches }),
  setStarMatches: (starMatches) => set({ starMatches }),
  toggleShortlist: (profileId) =>
    set((state) => {
      const next = new Set(state.shortlist);
      if (next.has(profileId)) {
        next.delete(profileId);
      } else {
        next.add(profileId);
      }
      return { shortlist: next };
    }),
  isShortlisted: (profileId) => get().shortlist.has(profileId),
}));
