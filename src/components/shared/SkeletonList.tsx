import { cn } from "@/lib/utils";
import { SkeletonCard } from "./SkeletonCard";

interface SkeletonListProps {
  /** Number of skeleton cards to render (default: 5) */
  count?: number;
  className?: string;
}

/**
 * A list of SkeletonCard placeholders used while a paginated list is loading.
 */
export function SkeletonList({ count = 5, className }: SkeletonListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
