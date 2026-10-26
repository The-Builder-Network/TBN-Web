import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JobsStatusBadgeProps {
  status: string;
  className?: string;
}

const STYLES: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "Open", className: "bg-green-100 text-green-700 border-green-200" },
  HIRED: { label: "Hired", className: "bg-blue-100 text-blue-700 border-blue-200" },
  COMPLETED: { label: "Completed", className: "bg-primary/10 text-primary border-primary/20" },
  CLOSED: { label: "Closed", className: "bg-muted text-muted-foreground" },
  EXPIRED: { label: "Expired", className: "bg-amber-100 text-amber-800 border-amber-200" },
};

const JobsStatusBadge = ({ status, className }: JobsStatusBadgeProps) => {
  const style = STYLES[status.toUpperCase()] ?? STYLES.CLOSED;
  return (
    <Badge
      variant="outline"
      className={cn("font-medium px-2 py-0.5 text-xs hover:bg-inherit", style.className, className)}
    >
      {STYLES[status.toUpperCase()] ? style.label : status}
    </Badge>
  );
};

export default JobsStatusBadge;
