import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Loader2 } from "lucide-react";
import JobServiceCombobox from "../shared/JobServiceCombobox";
import { toast } from "@/hooks/use-toast";
import { useCreateQuestion } from "@/api/questions";
import { useAuth } from "@/hooks/useAuth";

interface AskQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}

const AskQuestionModal = ({
  open,
  onOpenChange,
  initialService = "",
}: AskQuestionModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createQuestionMutation = useCreateQuestion();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [service, setService] = useState(initialService);
  const MAX_TITLE = 100;

  useEffect(() => {
    setService(initialService);
  }, [initialService, open]);

  // Reset form on close
  useEffect(() => {
    if (!open) {
      setTitle("");
      setBody("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast({ title: "Please fill in the title and question fields.", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({ title: "You must be signed in to ask a question.", variant: "destructive" });
      return;
    }

    createQuestionMutation.mutate(
      {
        title: title.trim(),
        body: body.trim(),
        serviceSlug: service || undefined,
      },
      {
        onSuccess: (data) => {
          onOpenChange(false);
          toast({ title: "Question posted!" });
          navigate(`/questions/${data.id}`);
        },
        onError: () => {
          toast({ title: "Failed to post question. Please try again.", variant: "destructive" });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl px-6 py-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            Ask a question
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              placeholder="E.g. How do I fix a leaking radiator?"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Characters remaining: {MAX_TITLE - title.length}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Question</label>
            <Textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your question in detail..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="hide-name" />
            <label htmlFor="hide-name" className="text-sm">
              Hide my name
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={createQuestionMutation.isPending || !title.trim() || !body.trim()}
          >
            {createQuestionMutation.isPending ? (
              <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Submitting…</>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionModal;
