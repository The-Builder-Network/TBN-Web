import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  body: string;
  isOwn: boolean;
  createdAt: string;
  readAt?: string | null;
}

export function MessageBubble({ body, isOwn, createdAt, readAt }: MessageBubbleProps) {
  const time = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex mb-2", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm",
          isOwn
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{body}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-1 text-[11px]",
            isOwn ? "justify-end text-primary-foreground/70" : "justify-start text-muted-foreground"
          )}
        >
          <span>{time}</span>
          {isOwn && (
            readAt ? (
              <CheckCheck className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
