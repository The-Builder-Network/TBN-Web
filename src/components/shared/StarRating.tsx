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

  const handleKeyDown = (e: React.KeyboardEvent, star: number) => {
    if (!interactive) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange?.(Math.min(star + 1, maxStars));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange?.(Math.max(star - 1, 1));
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange?.(star);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div
        className={cn("flex gap-0.5", interactive && "cursor-pointer")}
        role={interactive ? "radiogroup" : undefined}
        aria-label={interactive ? "Rating" : undefined}
        onMouseLeave={() => interactive && setHovered(null)}
      >
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
          <Star
            key={star}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? star === rating : undefined}
            aria-label={
              interactive ? `${star} star${star !== 1 ? "s" : ""}` : undefined
            }
            tabIndex={
              interactive ? (star === (rating || 1) ? 0 : -1) : undefined
            }
            className={cn(
              sizeMap[size],
              "transition-colors",
              interactive &&
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
              star <= displayed
                ? "fill-star text-star"
                : "fill-muted text-muted-foreground",
            )}
            onMouseEnter={() => interactive && setHovered(star)}
            onClick={() => interactive && onChange?.(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
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
