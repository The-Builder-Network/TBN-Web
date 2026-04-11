import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SortOption {
  value: string;
  label: string;
}

interface SortOptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (sort: string) => void;
  options: SortOption[];
  currentValue?: string;
}

const SortOptionsModal = ({
  open,
  onOpenChange,
  onApply,
  options,
  currentValue,
}: SortOptionsModalProps) => {
  const [selected, setSelected] = useState(
    currentValue ?? options[0]?.value ?? "",
  );

  const handleApply = () => {
    onApply(selected);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gap-0 p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
          <DialogTitle>Sort by</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            className="gap-4"
          >
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={opt.value} />
                <Label
                  htmlFor={opt.value}
                  className="font-normal text-base cursor-pointer flex-1"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="p-4 border-t bg-muted/20">
          <Button onClick={handleApply} className="w-full text-md h-10">
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SortOptionsModal;
