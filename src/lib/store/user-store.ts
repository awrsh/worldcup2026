import { create } from "zustand";
import type { User } from "@/lib/api/types";

const GUEST_USER: User = {
  id: "guest",
  username: "Guest",
  avatarInitials: "G",
  countryCode: "US",
  totalPoints: 0,
};

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: GUEST_USER,
  setUser: (user) => set({ user }),
}));
