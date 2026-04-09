import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JobsStatusBadgeProps {
  status: string;
  className?: string;
}

const JobsStatusBadge = ({ status, className }: JobsStatusBadgeProps) => {
  const isClosed = status.toLowerCase() === "closed";

  return (
    <Badge
      variant={isClosed ? "secondary" : "default"}
      className={cn(
        "font-medium px-2 py-0.5 text-xs capitalize",
        isClosed
          ? "bg-muted text-muted-foreground hover:bg-muted"
          : "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
        className,
      )}
    >
      {status}
    </Badge>
  );
};

export default JobsStatusBadge;
