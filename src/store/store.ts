import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookie, deleteCookie } from "cookies-next";

type User = string | null;

interface AuthState {
  isLoggedIn: boolean;
  user: User;
  hasHydrated: boolean;
}

interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      hasHydrated: false,
      // login: (user: User) =>
      //   set(() => ({
      //     isLoggedIn: true,
      //     user,
      //   })),
      login: (user) => {
        set({
          isLoggedIn: true,
          user,
        });
        // 👇 FAKE auth flag (practice only)
        setCookie("logged_in", "true", { path: "/" });
      },

      logout: () =>
        set(() => {
          deleteCookie("logged_in", { path: "/" });
          return {
            isLoggedIn: false,
            user: null,
          };
        }),
    }),
    {
      name: "prt-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
