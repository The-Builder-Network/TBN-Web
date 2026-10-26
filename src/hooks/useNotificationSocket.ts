import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getNotifSocket } from "@/lib/socket";
import { notificationKeys } from "@/api/notifications";

/**
 * Hook that listens for real-time `notification` events and
 * invalidates the React Query notification caches so the UI updates instantly.
 * Mount once for any authenticated user (e.g. in the PageLayout).
 */
export function useNotificationSocket() {
  const qc = useQueryClient();

  useEffect(() => {
    const socket = getNotifSocket();

    const onNotification = () => {
      void qc.invalidateQueries({ queryKey: notificationKeys.all });
      void qc.invalidateQueries({ queryKey: notificationKeys.unreadCount });
      // Most notifications reflect a state change elsewhere (lead, job, credits).
      void qc.invalidateQueries({ queryKey: ["leads"] });
      void qc.invalidateQueries({ queryKey: ["jobs"] });
      void qc.invalidateQueries({ queryKey: ["payments", "balance"] });
      void qc.invalidateQueries({ queryKey: ["conversations"] });
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  }, [qc]);
}
