import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, NotificationItem } from "./types";

export async function getNotifications(
  page = 1,
  unreadOnly = false,
): Promise<PaginatedResponse<NotificationItem>> {
  const res = await api.get<PaginatedResponse<NotificationItem>>(
    "/notifications",
    {
      params: { page, perPage: 20, unreadOnly },
    },
  );
  return res.data;
}

export async function getUnreadCount(): Promise<{ count: number }> {
  const res = await api.get<{ count: number }>("/notifications/unread-count");
  return res.data;
}

export async function markRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllRead(): Promise<void> {
  await api.post("/notifications/read-all");
}

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (page: number) => ["notifications", "list", page] as const,
  unreadCount: ["notifications", "unread-count"] as const,
};

export function useNotifications(page = 1) {
  return useQuery({
    queryKey: notificationKeys.list(page),
    queryFn: () => getNotifications(page),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount,
    queryFn: getUnreadCount,
    refetchInterval: 120_000, // fallback poll — real-time handled by Socket.IO
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markRead,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: notificationKeys.all });
      void qc.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllRead,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: notificationKeys.all });
      void qc.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}
