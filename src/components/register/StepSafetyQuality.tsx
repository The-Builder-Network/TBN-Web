import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, ChevronLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addQualification } from "@/api/users";

type SubStep =
  | "intro"
  | "skillset"
  | "evaluation-intro"
  | "evaluation-upload"
  | "pending";

const SKILLSETS = [
  "Plumbing",
  "Electrical",
  "Carpentry & Joinery",
  "Painting & Decorating",
  "Building",
  "Roofing",
  "Plastering",
  "Tiling",
  "Landscaping",
  "Kitchen Fitting",
  "Bathroom Fitting",
  "Flooring",
];

const QUALIFICATION_INFO: Record<
  string,
  { title: string; requirements: string[] }
> = {
  Electrical: {
    title: "Electrical",
    requirements: [
      "**Gold ECS Card** (Must show *Installation* or *Maintenance Electrician* grade. Please upload photos of both the front and back).",
      "**Level 3 NVQ + AM2 + 18th Edition** (City & Guilds 2356, 2357, or 5357 Certificate + your AM2/AM2S certificate + your current BS 18th Edition qualification).",
      "**Experienced Worker Route** (City & Guilds 2346 Level 3 NVQ + AM2E certificate + current 18th Edition qualification).",
    ],
  },
  Plumbing: {
    title: "Plumbing",
    requirements: [
      "**NVQ Level 2 or 3 in Plumbing** or equivalent qualification.",
      "**JIB-PMES Card** or **CSCS card** showing plumbing qualification.",
      "**Gas Safe Registration** (if applicable for gas-related plumbing work).",
    ],
  },
};

const getQualificationInfo = (skill: string) => {
  return (
    QUALIFICATION_INFO[skill] || {
      title: skill,
      requirements: [
        `**Relevant NVQ or equivalent** in ${skill}.`,
        `**Trade body membership** or certification for ${skill}.`,
        `**Portfolio of completed work** demonstrating ${skill} competency.`,
      ],
    }
  );
};

const StepSafetyQuality = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: Record<string, unknown>;
  onUpdate: (d: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const { toast } = useToast();
  const [subStep, setSubStep] = useState<SubStep>("intro");
  const [selectedSkill, setSelectedSkill] = useState<string>(
    data.strongestSkill || "",
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createQualification, isPending: isSavingQual } = useMutation({
    mutationFn: (name: string) => addQualification({ name }),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => f.size <= 15 * 1024 * 1024);
    if (validFiles.length < files.length) {
      toast({
        title: "Files skipped",
        description: "Some files exceeded the 15MB limit and were skipped.",
        variant: "destructive",
      });
    }
    setUploadedFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (subStep === "intro") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-1">Verify your skills</h2>
        <p className="text-sm text-muted-foreground mb-6">~ 5 mins</p>
        <p className="text-sm mb-4">
          The Builder Network supports quality tradespeople.
        </p>
        <p className="text-sm mb-4">
          In this step, we check the skills of all tradespeople joining so
          customers use The Builder Network with confidence.
        </p>
        <p className="text-sm mb-8">
          Our application process is thorough, and only those who meet our high
          standards are accepted.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="h-11 px-6">
            Back
          </Button>
          <Button onClick={() => setSubStep("skillset")} className="h-11 px-6">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (subStep === "skillset") {
    // Use the professions selected in StepWorkDetails, falling back to the static list
    const skillsetOptions: string[] =
      Array.isArray(data.professions) &&
      (data.professions as string[]).length > 0
        ? (data.professions as string[])
        : SKILLSETS;

    return (
      <div>
        <h2 className="text-2xl font-bold mb-1">
          Select your strongest skillset
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pass skills evaluations to unlock leads in your areas of expertise.
        </p>
        <div className="space-y-2 mb-8">
          {skillsetOptions.map((skill) => (
            <div
              key={skill}
              className={`flex items-center gap-3 border px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                selectedSkill === skill
                  ? "border-primary/70 bg-accent/30"
                  : "border-border"
              }`}
              onClick={() => setSelectedSkill(skill)}
            >
              <div
                className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  selectedSkill === skill
                    ? "border-primary"
                    : "border-muted-foreground/40"
                }`}
              >
                {selectedSkill === skill && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setSubStep("intro")}
            className="h-11 px-6"
          >
            Back
          </Button>
          <Button
            disabled={!selectedSkill}
            onClick={() => {
              onUpdate({ strongestSkill: selectedSkill });
              setSubStep("evaluation-intro");
            }}
            className="h-11 px-6"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  if (subStep === "evaluation-intro") {
    return (
      <div>
        <button
          onClick={() => setSubStep("skillset")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-3xl font-bold mb-6">{selectedSkill}</h2>
        <p className="text-lg mb-8">
          We need to ensure you are qualified to undertake {selectedSkill} jobs.
          Complete the next step to unlock jobs.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setSubStep("skillset")}
            className="h-12 px-6 text-base"
          >
            Back
          </Button>
          <Button
            onClick={() => setSubStep("evaluation-upload")}
            className="h-12 px-6 text-base"
          >
            Start evaluation
          </Button>
        </div>
      </div>
    );
  }

  if (subStep === "evaluation-upload") {
    const qualInfo = getQualificationInfo(selectedSkill);
    return (
      <div>
        <button
          onClick={() => setSubStep("evaluation-intro")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-3xl font-bold mb-6">{qualInfo.title}</h2>
        <p className="text-lg mb-4">
          Proof of your {qualInfo.title.toLowerCase()} qualifications is
          required from one of the following three sets of documents. Please
          upload yours below:
        </p>
        <ul className="space-y-4 mb-8">
          {qualInfo.requirements.map((req, i) => (
            <li key={i} className="text-base">
              -{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: req
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                }}
              />
            </li>
          ))}
        </ul>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          multiple
          className="hidden"
        />

        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mb-4">
            {uploadedFiles.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-base flex-1 truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center gap-3 p-6 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors mb-2"
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <span className="text-base text-muted-foreground">
            Select files, drag and drop, or take a photo with your camera.
          </span>
        </button>
        <p className="text-sm text-muted-foreground mb-8">
          Upload PNG, JPG or PDF up to 15 MB
        </p>

        <Button
          disabled={uploadedFiles.length === 0 || isSavingQual}
          onClick={() => {
            createQualification(selectedSkill, {
              onSuccess: () => {
                onUpdate({
                  strongestSkill: selectedSkill,
                  qualificationUploaded: true,
                });
                setSubStep("pending");
              },
              onError: () => {
                toast({
                  title: "Error",
                  description:
                    "Failed to save qualification. Please try again.",
                  variant: "destructive",
                });
              },
            });
          }}
          className="h-12 px-6 text-base"
        >
          {isSavingQual ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    );
  }

  // Pending approval
  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Pending approval</h2>
      <p className="text-lg text-muted-foreground mb-8">
        We're reviewing the details you submitted.
      </p>
      <Button onClick={onNext} className="h-12 px-6 text-base">
        Continue
      </Button>
    </div>
  );
};

export default StepSafetyQuality;
