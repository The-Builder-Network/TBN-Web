import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayed = hovered ?? rating;

  return (
    <div className="flex items-center gap-1">
      <div
        className={cn("flex gap-0.5", interactive && "cursor-pointer")}
        onMouseLeave={() => interactive && setHovered(null)}
      >
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
          <Star
            key={star}
            className={cn(
              sizeMap[size],
              "transition-colors",
              star <= displayed
                ? "fill-star text-star"
                : "fill-muted text-muted-foreground",
            )}
            onMouseEnter={() => interactive && setHovered(star)}
            onClick={() => interactive && onChange?.(star)}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
