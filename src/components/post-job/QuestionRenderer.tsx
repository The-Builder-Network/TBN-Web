import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { validateUKPostcode } from "@/helpers/postcodeHelper";
import type { QuestionNode, AnswerValue } from "./types";

interface QuestionRendererProps {
  node: QuestionNode;
  /** Pre-filled answer when navigating back */
  initialAnswer?: AnswerValue;
  onNext: (answer: AnswerValue) => void;
  onBack: (() => void) | null;
}

/**
 * Renders a single question node based on its `type` and calls `onNext`
 * when the user advances.
 */
const QuestionRenderer = ({
  node,
  initialAnswer,
  onNext,
  onBack,
}: QuestionRendererProps) => {
  // ── Local draft state (committed only on "Next") ──
  const [draft, setDraft] = useState<AnswerValue>(
    initialAnswer ?? getDefault(node),
  );
  const [isPostcodeValid, setIsPostcodeValid] = useState<boolean>(true);

  // Reset draft when the node changes
  useEffect(() => {
    setDraft(initialAnswer ?? getDefault(node));
    setIsPostcodeValid(true);
  }, [node, initialAnswer]);

  const canProceed = isValid(node, draft) && isPostcodeValid;

  const handleNext = () => {
    if (canProceed) onNext(draft);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Label / helpText */}
      <div className="space-y-2">
        <Label className="text-md font-medium">
          {node.formLabel}{" "}
          {node.required !== false && <span className="text-red-500">*</span>}
        </Label>
        {node.helpText && (
          <p className="text-muted-foreground">{node.helpText}</p>
        )}
      </div>

      {/* Question body */}
      {node.type === "SelectQuestion" && (
        <SelectBody node={node} value={draft as string} onChange={setDraft} />
      )}
      {node.type === "CheckboxQuestion" && (
        <CheckboxBody
          node={node}
          value={draft as string[]}
          onChange={setDraft}
        />
      )}
      {node.type === "TextareaQuestion" && (
        <TextareaBody node={node} value={draft as string} onChange={setDraft} />
      )}
      {node.type === "TitleQuestion" && (
        <TitleBody node={node} value={draft as string} onChange={setDraft} />
      )}
      {node.type === "PostalCodeQuestion" && (
        <PostalCodeBody
          node={node}
          value={draft as string}
          onChange={setDraft}
          onValidationChange={setIsPostcodeValid}
        />
      )}
      {node.type === "AttachmentQuestion" && (
        <AttachmentBody value={draft as File[]} onChange={setDraft} />
      )}

      {/* Nav buttons */}
      <div className="flex gap-4">
        {onBack && (
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
        )}
        <Button
          size="lg"
          className="flex-1"
          onClick={handleNext}
          disabled={!canProceed}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuestionRenderer;

// ─── Sub-renderers ───────────────────────────────────────────────

function SelectBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
}) {
  // Track "Other" text for TextChoiceOption items
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});

  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
      {node.options?.map((opt) => (
        <div key={opt.id}>
          <div
            className="flex items-center space-x-2 gap-2 border px-3 py-3 rounded-lg hover:bg-highlight/5 cursor-pointer transition-colors"
            onClick={() => onChange(opt.id)}
          >
            <RadioGroupItem value={opt.id} id={`opt-${opt.id}`} />
            <Label
              htmlFor={`opt-${opt.id}`}
              className="flex-grow cursor-pointer font-normal text-base"
            >
              {opt.formLabel}
              {opt.helpText && (
                <p className="text-xs text-muted-foreground mt-1">
                  {opt.helpText}
                </p>
              )}
            </Label>
          </div>

          {/* TextChoiceOption: show text input when selected */}
          {opt.type === "TextChoiceOption" && value === opt.id && (
            <Input
              className="mt-2 ml-8 h-10 w-[calc(100%-2rem)]"
              placeholder={opt.placeholder ?? "Please specify..."}
              value={otherTexts[opt.id] ?? ""}
              onChange={(e) =>
                setOtherTexts((prev) => ({ ...prev, [opt.id]: e.target.value }))
              }
            />
          )}
        </div>
      ))}
    </RadioGroup>
  );
}

function CheckboxBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});

  const toggle = (id: string) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  };

  return (
    <div className="space-y-2">
      {node.options?.map((opt) => (
        <div key={opt.id}>
          <div
            className="flex items-center space-x-2 gap-2 border px-3 py-3 rounded-lg hover:bg-highlight/5 cursor-pointer transition-colors"
            onClick={() => toggle(opt.id)}
          >
            <Checkbox
              id={`chk-${opt.id}`}
              checked={value.includes(opt.id)}
              onCheckedChange={() => toggle(opt.id)}
            />
            <Label
              htmlFor={`chk-${opt.id}`}
              className="flex-grow cursor-pointer font-normal text-base"
            >
              {opt.formLabel}
              {opt.helpText && (
                <p className="text-xs text-muted-foreground mt-1">
                  {opt.helpText}
                </p>
              )}
            </Label>
          </div>

          {opt.type === "TextChoiceOption" && value.includes(opt.id) && (
            <Input
              className="mt-2 ml-8 h-10 w-[calc(100%-2rem)]"
              placeholder={opt.placeholder ?? "Please specify..."}
              value={otherTexts[opt.id] ?? ""}
              onChange={(e) =>
                setOtherTexts((prev) => ({ ...prev, [opt.id]: e.target.value }))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

function TextareaBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder={node.placeholder ?? ""}
        className="min-h-[200px] text-base p-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={node.maxLength}
      />
      {node.minLength && (
        <p className="text-xs text-muted-foreground">
          Minimum {node.minLength} characters
          {value.length > 0}
        </p>
      )}
    </div>
  );
}

function TitleBody({
  node,
  value,
  onChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 text-md"
        placeholder={node.placeholder ?? "e.g. Single storey extension"}
        maxLength={node.maxLength}
      />
    </div>
  );
}

function PostalCodeBody({
  node,
  value,
  onChange,
  onValidationChange,
}: {
  node: QuestionNode;
  value: string;
  onChange: (v: string) => void;
  onValidationChange: (isValid: boolean) => void;
}) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");

  // Debounced validation
  useEffect(() => {
    const postcode = value.trim();
    if (!postcode) {
      setPlaceName("");
      setError("");
      onValidationChange(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsValidating(true);
      setError("");

      const result = await validateUKPostcode(postcode);

      setPlaceName(result.placeName);
      setError(result.error);
      onValidationChange(result.isValid);
      setIsValidating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [value, onValidationChange]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className={`h-12 text-base ${placeName ? "text-transparent caret-black" : ""}`}
          placeholder={"e.g. EX37 9HW"}
        />
        {placeName && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2 text-base">
            <span className="text-foreground">{value}</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">{placeName}</span>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {isValidating && (
        <p className="text-xs text-muted-foreground">Validating postcode...</p>
      )}
    </div>
  );
}

function AttachmentBody({
  value,
  onChange,
}: {
  value: File[];
  onChange: (v: File[]) => void;
}) {
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange([...value, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-highlight/5 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-xs text-muted-foreground mb-2">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          SVG, PNG, JPG or GIF (max. 800×400px)
        </p>
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFiles}
        />
      </label>

      {/* Preview selected files */}
      {value.length > 0 && (
        <div className="space-y-1">
          {value.map((f, i) => (
            <p key={i} className="text-sm text-muted-foreground">
              📎 {f.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────

function getDefault(node: QuestionNode): AnswerValue {
  switch (node.type) {
    case "CheckboxQuestion":
      return [] as string[];
    case "AttachmentQuestion":
      return [] as File[];
    default:
      return "";
  }
}

function isValid(node: QuestionNode, answer: AnswerValue): boolean {
  // Optional questions are always valid
  if (node.required === false) return true;

  switch (node.type) {
    case "SelectQuestion":
      return typeof answer === "string" && answer.length > 0;
    case "CheckboxQuestion":
      return Array.isArray(answer) && answer.length > 0;
    case "TextareaQuestion": {
      const text = answer as string;
      return text.trim().length >= (node.minLength ?? 1);
    }
    case "TitleQuestion":
      return typeof answer === "string" && answer.trim().length > 0;
    case "PostalCodeQuestion":
      return typeof answer === "string" && answer.trim().length > 0;
    case "AttachmentQuestion":
      return true; // attachments are always optional-ish
    default:
      return true;
  }
}
