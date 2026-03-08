import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";

interface JobServiceSelectorProps {
  onSelect: (slug: string) => void;
}

const JobServiceSelector = ({ onSelect }: JobServiceSelectorProps) => {
  const [selected, setSelected] = useState("");
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Post a job</h1>
        <div className="space-y-2">
          <div className="flex items-center justify-end text-xs">
            <span className="font-medium">0% complete</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
      </div>

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Get responses from screened and reviewed tradespeople near you
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-md font-medium">
            What would you like to have done?{" "}
            <span className="text-red-500">*</span>
          </Label>
          <JobServiceCombobox
            value={selected}
            onChange={setSelected}
            placeholder="Select a service..."
          />
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() => onSelect(selected)}
          disabled={!selected}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobServiceSelector;
