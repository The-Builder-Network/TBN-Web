import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Bell,
  Briefcase,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  CreditCard,
  HelpCircle,
  ThumbsUp,
  ShieldCheck,
} from "lucide-react";
import type { NotificationItem } from "@/api/types";

const ICON_MAP: Record<string, React.ElementType> = {
  NEW_LEAD: Briefcase,
  NEW_INTEREST: Bell,
  NEW_QUOTE: CreditCard,
  NEW_MESSAGE: MessageSquare,
  NEW_REVIEW: Star,
  JOB_COMPLETED: CheckCircle,
  JOB_CANCELLED: XCircle,
  LEAD_EXPIRED: XCircle,
  CREDIT_LOW: CreditCard,
  CREDIT_TOPUP: CreditCard,
  ACCOUNT_VERIFIED: ShieldCheck,
  NEW_ANSWER: HelpCircle,
  ANSWER_LIKED: ThumbsUp,
};

interface NotificationItemProps {
  notification: NotificationItem;
  onRead: (id: string, link?: string) => void;
}

export function NotificationListItem({ notification, onRead }: NotificationItemProps) {
  const Icon = ICON_MAP[notification.type] ?? Bell;
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

  return (
    <button
      onClick={() => onRead(notification.id, notification.linkUrl)}
      className={cn(
        "w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b last:border-0",
        !notification.read && "bg-primary/5"
      )}
    >
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm leading-snug", !notification.read && "font-semibold")}>
          {notification.title}
        </p>
        {notification.body && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.body}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
      </div>
      {!notification.read && (
        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
      )}
    </button>
  );
}
