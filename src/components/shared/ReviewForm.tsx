import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { useCreateReview } from "@/api/reviews";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  jobId: string;
  tradespersonId: string;
  tradespersonName: string;
  onSuccess: () => void;
}

export function ReviewForm({
  jobId,
  tradespersonId,
  tradespersonName,
  onSuccess,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { mutate: createReview, isPending } = useCreateReview();
  const { toast } = useToast();

  const isValid = rating > 0 && comment.trim().length >= 10;

  function handleSubmit() {
    if (!isValid) return;
    createReview(
      { jobId, tradespersonId, rating, comment: comment.trim() },
      {
        onSuccess: () => {
          toast({ title: "Review submitted. Thank you!" });
          onSuccess();
        },
        onError: () => {
          toast({ title: "Failed to submit review", variant: "destructive" });
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Leave a review for {tradespersonName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Your rating</p>
          <StarRating
            rating={rating}
            size="lg"
            interactive
            onChange={setRating}
          />
        </div>

        <div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe your experience (at least 10 characters)…"
            rows={4}
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {comment.length}/1000
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid || isPending}
          className="w-full"
        >
          {isPending ? "Submitting…" : "Submit review"}
        </Button>
      </CardContent>
    </Card>
  );
}
