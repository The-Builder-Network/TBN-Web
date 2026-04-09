import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

/**
 * A generic loading skeleton shaped like a job/lead card.
 * Renders a shimmer placeholder while data is loading.
 */
export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-5 space-y-3 animate-pulse",
        className,
      )}
    >
      {/* Title row */}
      <div className="flex items-center gap-3">
        <div className="h-4 w-16 bg-muted rounded" />
        <div className="h-5 w-24 bg-muted rounded" />
      </div>
      {/* Main title */}
      <div className="h-6 w-2/3 bg-muted rounded" />
      {/* Sub line */}
      <div className="h-4 w-1/3 bg-muted rounded" />
      {/* Extra lines */}
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div key={i} className="h-4 w-full bg-muted rounded" />
      ))}
    </div>
  );
}
