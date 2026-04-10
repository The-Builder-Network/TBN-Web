import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  CreditCard,
  Car,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadIdDocument } from "@/api/users";

type SubStep = "intro" | "select-id" | "review";

const ID_TYPES = [
  { value: "passport", label: "Passport", icon: FileText },
  { value: "identity-card", label: "Identity card", icon: CreditCard },
  { value: "drivers-licence", label: "Driver's licence", icon: Car },
];

const StepIDCheck = ({
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
  const [selectedIdType, setSelectedIdType] = useState<string>(
    data.idType || "",
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadId, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadIdDocument(file),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      onUpdate({ idType: selectedIdType, idUploaded: false });
      onNext();
      return;
    }
    uploadId(uploadedFile, {
      onSuccess: () => {
        onUpdate({ idType: selectedIdType, idUploaded: true });
        onNext();
      },
      onError: () => {
        toast({
          title: "Upload failed",
          description: "Failed to upload ID document. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  // Intro
  if (subStep === "intro") {
    return (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold">Verify your identity</h2>
        </div>
        <p className="text-base mb-4">
          This helps us check that you're really you and helps keep The Builder
          Network secure.
        </p>
        <p className="text-base mb-8">
          We will handle your personal data securely and in accordance with our{" "}
          <a href="#" className="text-primary underline">
            privacy policy
          </a>
          .
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="h-12 px-6 text-base"
          >
            Back
          </Button>
          <Button
            onClick={() => setSubStep("select-id")}
            className="h-12 px-6 text-base"
          >
            Verify identity
          </Button>
        </div>
      </div>
    );
  }

  // Select ID type
  if (subStep === "select-id") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-2">Select your ID type</h2>
        <p className="text-base text-muted-foreground mb-6">
          Use a valid ID that is not expired.
        </p>

        <div className="space-y-3 mb-6">
          {ID_TYPES.map((id) => {
            const Icon = id.icon;
            const selected = selectedIdType === id.value;
            return (
              <div key={id.value}>
                <button
                  onClick={() => setSelectedIdType(selected ? "" : id.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-base">{id.label}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? "border-primary" : "border-muted-foreground/40"
                    }`}
                  >
                    {selected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                </button>

                {/* Upload UI appears below selected type */}
                {selected && (
                  <div className="mt-3 ml-4 p-4 border rounded-lg bg-muted/30">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                    {!uploadedFile ? (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-base text-muted-foreground">
                          Click to upload your {id.label.toLowerCase()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Max 5MB
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-base flex-1 truncate">
                          {uploadedFile.name}
                        </span>
                        <button
                          onClick={() => {
                            setUploadedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
          ⓘ{" "}
          <a href="#" className="text-primary underline">
            Why do we need your identity?
          </a>
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onUpdate({ idType: "", idUploaded: false });
              onNext();
            }}
            className="text-base font-medium text-muted-foreground hover:text-foreground"
          >
            Upload later
          </button>
          <Button
            onClick={() => {
              if (uploadedFile) {
                setSubStep("review");
              }
            }}
            disabled={!selectedIdType || !uploadedFile}
            className="h-12 px-6 text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Review
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Review your {ID_TYPES.find((t) => t.value === selectedIdType)?.label}
      </h2>
      <p className="text-base text-muted-foreground mb-6">
        Make sure your entire ID is clear, well-lit and fits inside the frame.
      </p>

      <div
        className="bg-muted/30 rounded-lg p-6 mb-6 flex items-center justify-center"
        style={{ minHeight: 200 }}
      >
        {previewUrl && (
          <img
            src={previewUrl}
            alt="ID preview"
            className="max-h-48 rounded-lg object-contain"
          />
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setSubStep("select-id")}
          className="h-12 px-6 text-base"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isUploading}
          className="h-12 px-6 text-base"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepIDCheck;
