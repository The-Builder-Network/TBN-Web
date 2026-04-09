import { useCallback, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/auth";
import { AuthContext } from "./authContextValue";
import { useMe, logoutApi, authKeys } from "@/api/auth";
import { disconnectSockets } from "@/lib/socket";

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const { data: user, isLoading } = useMe();

  const login = useCallback(
    (u: User) => {
      qc.setQueryData(authKeys.me, u);
    },
    [qc],
  );

  const logout = useCallback(async () => {
    disconnectSockets();
    await logoutApi();
    qc.setQueryData(authKeys.me, null);
  }, [qc]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
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
