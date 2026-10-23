import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Building blocks for the info / policy pages so they share one layout. */

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b bg-primary/[0.04]">
      <div className="container py-14 md:py-20">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          {children && (
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
      {children}
    </p>
  );
}

export function Section({
  eyebrow,
  title,
  tinted = false,
  children,
}: {
  eyebrow?: string;
  title?: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={cn("py-14 md:py-20", tinted && "bg-primary/[0.04]")}>
      <div className="container">
        {(eyebrow || title) && (
          <div className="mb-8 max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export function CheckList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground">
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export interface CardItem {
  title: string;
  description: ReactNode;
}

export function CardGrid({
  items,
  numbered = false,
  className,
}: {
  items: CardItem[];
  numbered?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {items.map(({ title, description }, i) => (
        <li key={title} className="rounded-xl border bg-card p-6 shadow-card">
          {numbered && (
            <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {i + 1}
            </span>
          )}
          <h3 className="font-semibold text-foreground">{title}</h3>
          <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </div>
        </li>
      ))}
    </ul>
  );
}
