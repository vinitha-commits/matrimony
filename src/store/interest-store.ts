import { create } from "zustand";
import type { Interest } from "@/types";

interface InterestState {
  received: Interest[];
  sent: Interest[];
  accepted: Interest[];
  setReceived: (interests: Interest[]) => void;
  setSent: (interests: Interest[]) => void;
  setAccepted: (interests: Interest[]) => void;
  acceptInterest: (id: string) => void;
  declineInterest: (id: string) => void;
  withdrawInterest: (id: string) => void;
}

export const useInterestStore = create<InterestState>((set) => ({
  received: [],
  sent: [],
  accepted: [],
  setReceived: (received) => set({ received }),
  setSent: (sent) => set({ sent }),
  setAccepted: (accepted) => set({ accepted }),
  acceptInterest: (id) =>
    set((state) => ({
      received: state.received.map((i) =>
        i.id === id ? { ...i, status: "accepted" as const } : i
      ),
    })),
  declineInterest: (id) =>
    set((state) => ({
      received: state.received.map((i) =>
        i.id === id ? { ...i, status: "declined" as const } : i
      ),
    })),
  withdrawInterest: (id) =>
    set((state) => ({
      sent: state.sent.map((i) =>
        i.id === id ? { ...i, status: "withdrawn" as const } : i
      ),
    })),
}));
