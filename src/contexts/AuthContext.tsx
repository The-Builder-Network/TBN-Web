import { useState, useEffect, type ReactNode } from "react";
import type { User } from "@/types/auth";
import { AuthContext } from "./authContextValue";

const STORAGE_KEY = "tbn_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount (placeholder for real session check)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore corrupt storage
    }
    setIsLoading(false);
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        isHomeowner: user?.role === "homeowner",
        isTradesperson: user?.role === "tradesperson",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
