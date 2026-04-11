import type { OwnTradespersonProfile } from "@/api/types";

/**
 * Profile completion breakdown:
 *
 * 10%  — account created (always true if profile exists)
 * 10%  — company name added
 * 10%  — company description (bio, ≥50 chars)
 * 15%  — portfolio (≥1 image)
 * 10%  — work area (postcode + travel distance saved)
 * 15%  — services (≥5 services)
 * 30%  — documents (≥1 document uploaded)
 *
 * Total possible: 100%
 */

export interface CompletionStep {
  id: string;
  label: string;
  points: number;
  done: boolean;
  /** Tab to navigate to for this step */
  tab: string;
}

export interface ProfileCompletion {
  percentage: number;
  steps: CompletionStep[];
  /** Color class for the percentage: red <40, yellow <100, hidden at 100 */
  colorClass: string;
}

export function computeProfileCompletion(
  profile: OwnTradespersonProfile | undefined,
): ProfileCompletion {
  if (!profile) {
    return { percentage: 0, steps: [], colorClass: "text-destructive" };
  }

  const steps: CompletionStep[] = [
    {
      id: "account",
      label: "Account created",
      points: 10,
      done: true,
      tab: "company-details",
    },
    {
      id: "company-name",
      label: "Company name",
      points: 10,
      done: !!profile.companyName?.trim(),
      tab: "company-details",
    },
    {
      id: "bio",
      label: "Company description",
      points: 10,
      done: !!(profile.bio && profile.bio.trim().length >= 50),
      tab: "company-details",
    },
    {
      id: "portfolio",
      label: "Portfolio (add ≥1 photo)",
      points: 15,
      done: (profile.portfolioItems?.length ?? 0) >= 1,
      tab: "portfolio",
    },
    {
      id: "work-area",
      label: "Work area (postcode + distance)",
      points: 10,
      done: !!profile.postcode?.trim() && profile.workRadiusMiles > 0,
      tab: "work-area",
    },
    {
      id: "services",
      label: "Services (add ≥5)",
      points: 15,
      done: (profile.services?.length ?? 0) >= 5,
      tab: "services",
    },
    {
      id: "documents",
      label: "Documents uploaded",
      points: 30,
      done: (profile.documents?.length ?? 0) >= 1,
      tab: "my-documents",
    },
  ];

  const percentage = steps.reduce(
    (acc, step) => acc + (step.done ? step.points : 0),
    0,
  );

  const colorClass =
    percentage >= 100
      ? "text-green-600"
      : percentage >= 40
        ? "text-amber-500"
        : "text-destructive";

  return { percentage, steps, colorClass };
}
