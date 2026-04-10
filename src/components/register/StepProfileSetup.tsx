import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Info,
  ChevronRight,
  HardHat,
  MapPin,
  Wrench,
  Award,
  Loader2,
} from "lucide-react";
import { useUpdateMyProfile } from "@/api/users";
import { useToast } from "@/hooks/use-toast";

const MAX_CHARS = 1200;

const StepProfileSetup = ({ data, onUpdate, onComplete, onBack }) => {
  const [description, setDescription] = useState(data.companyDescription || "");
  const [showTips, setShowTips] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();
  const { toast } = useToast();

  const remaining = MAX_CHARS - description.length;

  const handleSubmit = () => {
    onUpdate({ companyDescription: description });
    updateProfile(
      { bio: description },
      {
        onSuccess: () => onComplete(),
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to save profile. Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">
        Introduce yourself to future customers
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        This is your chance to make a great first impression. You can always
        make edits later in your profile.
      </p>

      <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-base">
            A quality description can increase your chances of getting hired.
          </p>
          <button
            onClick={() => setShowTips(true)}
            className="text-primary font-medium flex items-center gap-1 mt-1 hover:underline text-base"
          >
            Get writing tips <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-base font-semibold block mb-2">
          Company description
        </label>
        <Textarea
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS)
              setDescription(e.target.value);
          }}
          placeholder="Tell customers about your experience, skills, and what makes you the right person for the job..."
          className="text-base min-h-[160px]"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {remaining} characters remaining
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 px-6 text-base"
        >
          Back
        </Button>
        <Button
          disabled={description.trim().length < 50 || isPending}
          onClick={handleSubmit}
          className="h-12 px-6 text-base"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </div>

      {/* Writing tips modal */}
      <Dialog open={showTips} onOpenChange={setShowTips}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Customers want to know
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 mt-2">
            {[
              {
                icon: HardHat,
                title: "How long you have been working",
                desc: "Talk about your experience and past jobs.",
              },
              {
                icon: MapPin,
                title: "Where you can work",
                desc: "Include where you work and the places you can travel for jobs.",
              },
              {
                icon: Wrench,
                title: "What your special skills are",
                desc: "List skills and knowledge that show your expertise.",
              },
              {
                icon: Award,
                title: "Why they should hire you",
                desc: "Share your work philosophy and why you're the best person for the job.",
              },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4">
                <tip.icon className="h-6 w-6 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-base">{tip.title}</p>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StepProfileSetup;
