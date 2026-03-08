import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import JobServiceSelector from "@/components/post-job/JobServiceSelector";
import JobServiceCombobox from "../shared/JobServiceCombobox";

interface AskQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AskQuestionModal = ({ open, onOpenChange }: AskQuestionModalProps) => {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const MAX_TITLE = 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl px-6 py-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            Ask a question
          </DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          {/* Reuse JobServiceSelector for service selection */}
          <JobServiceCombobox
            value={service}
            onChange={setService}
            placeholder="Select a service related to your question"
            triggerClassName=""
          />

          <div>
            <label className="text-sm font-medium block mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE))}
              maxLength={MAX_TITLE}
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Characters remaining: {MAX_TITLE - title.length}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Question</label>
            <Textarea rows={6} />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="hide-name" />
            <label htmlFor="hide-name" className="text-sm">
              Hide my name
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionModal;
