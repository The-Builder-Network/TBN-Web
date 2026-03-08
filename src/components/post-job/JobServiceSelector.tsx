import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";

interface JobServiceSelectorProps {
  onSelect: (slug: string) => void;
  title?: string;
  showProgress?: boolean;
  showDescription?: boolean;
  showButton?: boolean;
  buttonText?: string;
  selectedService?: string;
  onServiceChange?: (slug: string) => void;
  label?: string;
  placeholder?: string;
}

const JobServiceSelector = ({
  onSelect,
  title = "Post a job",
  showProgress = true,
  showDescription = true,
  showButton = true,
  buttonText = "Next",
  selectedService,
  onServiceChange,
  label = "What would you like to have done?",
  placeholder = "Select a service...",
}: JobServiceSelectorProps) => {
  const [internalSelected, setInternalSelected] = useState("");

  const selected =
    selectedService !== undefined ? selectedService : internalSelected;

  const handleServiceChange = (slug: string) => {
    setInternalSelected(slug);
    onServiceChange?.(slug);
  };

  return (
    <div>
      {title && (
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {showProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="font-medium">0% complete</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          )}
        </div>
      )}

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {showDescription && (
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Get responses from screened and reviewed tradespeople near you
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Label className="text-md font-medium">
            {label} <span className="text-red-500">*</span>
          </Label>
          <JobServiceCombobox
            value={selected}
            onChange={handleServiceChange}
            placeholder={placeholder}
          />
        </div>

        {showButton && (
          <Button
            size="lg"
            className="w-full"
            onClick={() => onSelect(selected)}
            disabled={!selected}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobServiceSelector;
