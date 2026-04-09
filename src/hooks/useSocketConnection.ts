import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { connectSockets, disconnectSockets } from "@/lib/socket";

/**
 * Manages the Socket.IO connection lifecycle.
 * Mount this once near the app root (e.g. inside App or a layout).
 * Connects when the user is authenticated, disconnects on logout.
 */
export function useSocketConnection() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      connectSockets();
    } else {
      disconnectSockets();
    }

    return () => {
      disconnectSockets();
    };
  }, [user]);
}
