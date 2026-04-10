import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StepCreateAccount from "@/components/register/StepCreateAccount";
import StepWorkDetails from "@/components/register/StepWorkDetails";
import StepSafetyQuality from "@/components/register/StepSafetyQuality";
import StepIDCheck from "@/components/register/StepIDCheck";
import StepProfileSetup from "@/components/register/StepProfileSetup";
import { useTradespersonRegistrationStore } from "@/stores/registrationStore";

const STEP_TITLES = [
  "Create your account", // 1
  "Work details", // 2
  "ID Check", // 3
  "Safety & Quality", // 4
  "Profile Setup", // 5
];

const TOTAL_STEPS = 5;

/**
 * /join — Full-page tradesperson registration wizard.
 * Entry point from /tradesnetwork hero form via:
 *   /join?trade=plumber&postcode=EX379HW&email=john@example.com
 */
const TradespersonJoinPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setEntryData, reset } = useTradespersonRegistrationStore();

  const [step, setStep] = useState(1);
  // Per-step local data passed down to each step component
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // Hydrate from URL params on mount
  useEffect(() => {
    const trade = searchParams.get("trade") ?? "";
    const postcode = searchParams.get("postcode") ?? "";
    const email = (searchParams.get("email") ?? "").toLowerCase();
    setEntryData(trade, postcode, email);
    setFormData((prev) => ({ ...prev, email, postcode }));

    return () => {
      // Don't reset on unmount — user may navigate back
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const progress = (step / TOTAL_STEPS) * 100;

  const updateFormData = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => {
    if (step === 1) {
      navigate("/tradesnetwork");
      return;
    }
    setStep((s) => s - 1);
  };

  const handleComplete = () => {
    reset();
    navigate("/tradesperson/my-leads");
  };

  const handleCancel = () => {
    navigate("/tradesnetwork");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Join The Builder Network — Create your trade account</title>
      </Helmet>

      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            {STEP_TITLES[step - 1]}
          </h1>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cancel registration"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto px-6 pt-5">
        <Progress value={progress} className="h-1.5" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {step}/{TOTAL_STEPS}
        </p>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {step === 1 && (
          <StepCreateAccount
            data={formData}
            onUpdate={updateFormData}
            onNext={next}
          />
        )}
        {step === 2 && (
          <StepWorkDetails
            data={formData}
            onUpdate={updateFormData}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <StepIDCheck
            data={formData}
            onUpdate={updateFormData}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <StepSafetyQuality
            data={formData}
            onUpdate={updateFormData}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 5 && (
          <StepProfileSetup
            data={formData}
            onUpdate={updateFormData}
            onComplete={handleComplete}
            onBack={back}
          />
        )}
      </div>
    </div>
  );
};

export default TradespersonJoinPage;
