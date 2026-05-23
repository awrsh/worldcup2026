import { create } from "zustand";
import type { User } from "@/lib/api/types";

interface UserStore {
  user: User;
}

export const useUserStore = create<UserStore>(() => ({
  user: {
    id: "u4",
    username: "Alex Fan",
    avatarInitials: "AF",
    countryCode: "US",
    totalPoints: 124,
  },
}));
