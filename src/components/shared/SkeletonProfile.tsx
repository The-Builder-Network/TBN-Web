import { cn } from "@/lib/utils";

interface SkeletonProfileProps {
  className?: string;
}

/**
 * Loading skeleton shaped like a tradesperson / user profile header.
 * Avatar + name + meta rows + a stats strip.
 */
export function SkeletonProfile({ className }: SkeletonProfileProps) {
  return (
    <div className={cn("animate-pulse space-y-6", className)}>
      {/* Cover image */}
      <div className="h-40 w-full rounded-xl bg-muted" />

      {/* Avatar + name block */}
      <div className="flex items-end gap-4 -mt-10 px-4">
        <div className="h-20 w-20 rounded-full border-4 border-background bg-muted shrink-0" />
        <div className="flex-1 space-y-2 pb-1">
          <div className="h-6 w-48 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex gap-6 px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-5 w-10 bg-muted rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>

      {/* Body lines */}
      <div className="px-4 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-muted rounded",
              i % 3 === 0 ? "w-2/3" : "w-full",
            )}
          />
        ))}
      </div>
    </div>
  );
}
