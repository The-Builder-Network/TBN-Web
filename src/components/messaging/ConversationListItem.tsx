import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import type { ConversationSummary } from "@/api/types";

interface ConversationListItemProps {
  conversation: ConversationSummary;
  isActive: boolean;
  onClick: () => void;
}

export function ConversationListItem({
  conversation,
  isActive,
  onClick,
}: ConversationListItemProps) {
  const { otherParty, lastMessage, unreadCount, job } = conversation;
  const initials = otherParty.name.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b last:border-0",
        isActive && "bg-muted"
      )}
    >
      {/* Avatar */}
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0 mt-0.5">
        {otherParty.avatarUrl ? (
          <img
            src={otherParty.avatarUrl}
            alt={otherParty.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className={cn("text-sm font-medium truncate", unreadCount > 0 && "font-semibold")}>
            {otherParty.name}
          </span>
          {lastMessage && (
            <span className="text-xs text-muted-foreground shrink-0">
              {formatDistanceToNow(new Date(lastMessage.createdAt), { addSuffix: true })}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground truncate">
            {lastMessage ? lastMessage.body : job.title}
          </p>
          {unreadCount > 0 && (
            <span className="shrink-0 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-medium">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
