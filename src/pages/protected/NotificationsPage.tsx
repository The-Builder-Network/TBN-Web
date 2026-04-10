import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "boneyard-js/react";
import {
  useNotifications,
  useMarkRead,
  useMarkAllRead,
} from "@/api/notifications";
import type { NotificationItem } from "@/api/types";
import { cn } from "@/lib/utils";

function NotificationRow({
  notification,
  onRead,
}: {
  notification: NotificationItem;
  onRead: (id: string) => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.read) onRead(notification.id);
    if (notification.linkUrl) navigate(notification.linkUrl);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors",
        !notification.read && "bg-primary/5",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{notification.title}</p>
          {notification.body && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {notification.body}
            </p>
          )}
        </div>
        {!notification.read && (
          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {new Date(notification.createdAt).toLocaleString()}
      </p>
    </button>
  );
}

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNotifications(page);
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const notifications = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <>
      <Helmet>
        <title>Notifications | The Build Network</title>
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          {hasUnread && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Skeleton name="notifications-list" loading={isLoading}>
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div>
                {notifications.map((n) => (
                  <NotificationRow
                    key={n.id}
                    notification={n}
                    onRead={(id) => markRead.mutate(id)}
                  />
                ))}
              </div>
            )}
          </Skeleton>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm self-center text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
