import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import StepCreateAccount from "@/components/register/StepCreateAccount";
import StepWorkDetails from "@/components/register/StepWorkDetails";
import StepIDCheck from "@/components/register/StepIDCheck";
import StepSafetyQuality from "@/components/register/StepSafetyQuality";
import StepProfileSetup from "@/components/register/StepProfileSetup";

const STEP_TITLES = [
  "Create your account",
  "Work details",
  "ID Check",
  "Safety & Quality",
  "Profile Setup",
];

const TOTAL_STEPS = 5;

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const updateFormData = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleComplete = () => {
    navigate("/newleads");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">{STEP_TITLES[currentStep - 1]}</h1>
          <button
            onClick={() => window.history.back()}
            className="text-base text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            Cancel ✕
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-6 pt-4">
        <Progress value={progress} className="h-2" />
        <span className="text-sm text-muted-foreground mt-2 block">
          Step {currentStep}/{TOTAL_STEPS}
        </span>
      </div>

      {/* Step Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {currentStep === 1 && (
          <StepCreateAccount data={formData} onUpdate={updateFormData} onNext={next} />
        )}
        {currentStep === 2 && (
          <StepWorkDetails data={formData} onUpdate={updateFormData} onNext={next} onBack={back} />
        )}
        {currentStep === 3 && (
          <StepIDCheck data={formData} onUpdate={updateFormData} onNext={next} onBack={back} />
        )}
        {currentStep === 4 && (
          <StepSafetyQuality data={formData} onUpdate={updateFormData} onNext={next} onBack={back} />
        )}
        {currentStep === 5 && (
          <StepProfileSetup data={formData} onUpdate={updateFormData} onComplete={handleComplete} onBack={back} />
        )}
      </div>
    </div>
  );
};

export default Register;
