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
    };

    const setup = () => {
      socket.on("notification", onNotification);
    };

    if (socket.connected) {
      setup();
    } else {
      socket.once("connect", setup);
    }

    return () => {
      socket.off("connect", setup);
      socket.off("notification", onNotification);
    };
  }, [qc]);
}
