import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { useReplyToReview } from "@/api/reviews";
import { useToast } from "@/hooks/use-toast";

interface ReviewCardProps {
  id: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment: string;
  jobTitle?: string;
  createdAt: string;
  reply?: {
    text: string;
    createdAt: string;
  };
  canReply?: boolean;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function ReviewCard({
  id,
  reviewerName,
  reviewerAvatar,
  rating,
  comment,
  jobTitle,
  createdAt,
  reply,
  canReply = false,
}: ReviewCardProps) {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { mutate: submitReply, isPending } = useReplyToReview();
  const { toast } = useToast();

  function handleSubmitReply() {
    if (!replyText.trim()) return;
    submitReply(
      { reviewId: id, body: replyText.trim() },
      {
        onSuccess: () => {
          toast({ title: "Reply posted" });
          setShowReplyInput(false);
          setReplyText("");
        },
        onError: () => {
          toast({ title: "Failed to post reply", variant: "destructive" });
        },
      },
    );
  }

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-start gap-4">
        {reviewerAvatar ? (
          <img
            src={reviewerAvatar}
            alt={reviewerName}
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-muted-foreground">
              {reviewerName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="font-semibold text-sm">{reviewerName}</span>
            <span className="text-xs text-muted-foreground shrink-0">
              {timeAgo(createdAt)}
            </span>
          </div>

          <div className="mb-2">
            <StarRating rating={rating} size="sm" />
          </div>

          {jobTitle && (
            <Badge variant="secondary" className="mb-2 text-xs">
              {jobTitle}
            </Badge>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed">
            {comment}
          </p>

          {/* Existing reply */}
          {reply && (
            <div className="mt-4 bg-muted/50 rounded-lg p-3 border-l-2 border-primary/30">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Response · {timeAgo(reply.createdAt)}
              </p>
              <p className="text-sm">{reply.text}</p>
            </div>
          )}

          {/* Reply form */}
          {canReply && !reply && (
            <div className="mt-4">
              {showReplyInput ? (
                <div className="space-y-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your response..."
                    rows={3}
                    maxLength={1000}
                    className="text-sm"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowReplyInput(false);
                        setReplyText("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim() || isPending}
                    >
                      {isPending ? "Posting…" : "Post reply"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground h-auto p-0"
                  onClick={() => setShowReplyInput(true)}
                >
                  Reply to this review
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
