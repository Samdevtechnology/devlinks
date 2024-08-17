import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  uid: string;
  email: string | null;
  nickname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  photoURL?: string | null;
  useNickname?: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
      updateUser: (updatedUser) =>
        set((state) => ({
          user: {
            uid: updatedUser.uid ?? state.user?.uid ?? "", // Ensure uid is always a string
            email: updatedUser.email ?? state.user?.email ?? null,
            nickname: updatedUser.nickname ?? state.user?.nickname ?? null,
            firstName: updatedUser.firstName ?? state.user?.firstName ?? null,
            lastName: updatedUser.lastName ?? state.user?.lastName ?? null,
            photoURL: updatedUser.photoURL ?? state.user?.photoURL ?? null,
            useNickname:
              updatedUser.useNickname ?? state.user?.useNickname ?? false,
          } as User,
        })),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
