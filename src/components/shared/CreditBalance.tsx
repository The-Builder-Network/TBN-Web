import { Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useBalance } from "@/api/payments";
import { cn } from "@/lib/utils";

interface CreditBalanceProps {
  className?: string;
}

/**
 * Shows the tradesperson's current credit balance in the header/sidebar.
 * Clicking navigates to the balance tab on their profile page.
 */
export function CreditBalance({ className }: CreditBalanceProps) {
  const { data } = useBalance();
  const balance = data?.balance ?? null;

  if (balance === null) return null;

  const isLow = balance < 5;

  return (
    <Link
      to="/tradesperson/profile?tab=balance"
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors hover:bg-muted",
        isLow
          ? "border-destructive/50 text-destructive"
          : "border-border text-foreground",
        className,
      )}
    >
      <Coins className={cn("h-3.5 w-3.5", isLow ? "text-destructive" : "text-amber-500")} />
      <span>{balance} credit{balance !== 1 ? "s" : ""}</span>
    </Link>
  );
}
