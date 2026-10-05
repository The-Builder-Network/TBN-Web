import type { ReactNode } from "react";
import { BadgeCheck, LayoutGrid, PoundSterling, Wrench } from "lucide-react";
import Counter from "@/components/shared/Counter";
import { useSearchTradespeople } from "@/api/search";
import { services } from "@/constants/services";
import { trades } from "@/constants/trades";

interface Stat {
  icon: typeof BadgeCheck;
  value: ReactNode;
  label: string;
}

const StatsSection = () => {
  // meta.total = approved (verified) tradespeople; hidden if the API is unavailable
  const { data } = useSearchTradespeople({ perPage: 1 });
  const verifiedCount = data?.meta.total ?? 0;

  const stats: Stat[] = [
    ...(verifiedCount > 0
      ? [
          {
            icon: BadgeCheck,
            value: <Counter to={verifiedCount} />,
            label: "Verified tradespeople",
          },
        ]
      : []),
    {
      icon: LayoutGrid,
      value: <Counter to={services.length} />,
      label: "Service categories",
    },
    {
      icon: Wrench,
      value: <Counter to={trades.length} />,
      label: "Trade specialisms",
    },
    { icon: PoundSterling, value: "Free", label: "To post your job" },
  ];

  return (
    <section className="bg-background pt-6 md:pt-10">
      <div className="container">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border shadow-card lg:flex">
          {stats.map(({ icon: Icon, value, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 bg-card px-4 py-5 last:odd:col-span-2 sm:gap-4 sm:px-6 lg:flex-1 lg:justify-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="text-2xl font-bold leading-none tracking-tight text-foreground md:text-3xl">
                  {value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {label}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
