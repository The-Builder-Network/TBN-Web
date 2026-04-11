import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMyProfile } from "@/api/users";
import { computeProfileCompletion } from "@/hooks/useProfileCompletion";

/**
 * Shown in the navbar for tradespeople when profile is < 100% complete.
 * Clicking navigates to the profile page on the first incomplete step's tab.
 */
export const ProfileCompletionBadge = () => {
  const navigate = useNavigate();
  const { data: profile } = useMyProfile();
  const completion = computeProfileCompletion(profile);

  if (completion.percentage >= 100) return null;

  const firstIncomplete = completion.steps.find((s) => !s.done);

  function handleClick() {
    if (firstIncomplete) {
      navigate(`/tradesperson/profile?tab=${firstIncomplete.tab}`);
    } else {
      navigate("/tradesperson/profile");
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={`text-sm font-semibold px-2 py-1 rounded-md hover:bg-muted transition-colors ${completion.colorClass}`}
          aria-label={`Profile ${completion.percentage}% complete`}
        >
          {completion.percentage}%
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="font-semibold mb-1">
          Profile {completion.percentage}% complete
        </p>
        <ul className="space-y-0.5 text-xs">
          {completion.steps.map((step) => (
            <li
              key={step.id}
              className={step.done ? "text-muted-foreground line-through" : ""}
            >
              {step.done ? "✓" : "○"} {step.label} (+{step.points}%)
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
};
