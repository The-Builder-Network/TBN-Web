import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JobsStatusBadgeProps {
  status: string;
  className?: string;
}

const JobsStatusBadge = ({ status, className }: JobsStatusBadgeProps) => {
  const normalized = status.toLowerCase();
  const isClosed = normalized === "closed";
  const isCancelled = normalized === "cancelled";

  const colorClass =
    isClosed || isCancelled
      ? isCancelled
        ? "bg-red-100 text-red-700 hover:bg-red-100 border-red-200"
        : "bg-muted text-muted-foreground hover:bg-muted"
      : "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium px-2 py-0.5 text-xs capitalize",
        colorClass,
        className,
      )}
    >
      {status}
    </Badge>
  );
};

export default JobsStatusBadge;
