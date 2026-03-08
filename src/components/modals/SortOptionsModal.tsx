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

interface SortOptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (sort: string) => void;
}

const SortOptionsModal = ({
  open,
  onOpenChange,
  onApply,
}: SortOptionsModalProps) => {
  const [selected, setSelected] = useState("most-recent");

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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most-liked" id="most-liked" />
              <Label
                htmlFor="most-liked"
                className="font-normal text-base cursor-pointer flex-1"
              >
                Most liked
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most-recent" id="most-recent" />
              <Label
                htmlFor="most-recent"
                className="font-normal text-base cursor-pointer flex-1"
              >
                Most recent
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most-answered" id="most-answered" />
              <Label
                htmlFor="most-answered"
                className="font-normal text-base cursor-pointer flex-1"
              >
                Most answered
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fewest-answers" id="fewest-answers" />
              <Label
                htmlFor="fewest-answers"
                className="font-normal text-base cursor-pointer flex-1"
              >
                Fewest answers
              </Label>
            </div>
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
