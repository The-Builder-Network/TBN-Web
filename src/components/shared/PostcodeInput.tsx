import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { validateUKPostcode } from "@/helpers/postcodeHelper";

interface PostcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange: (isValid: boolean) => void;
  placeholder?: string;
  /** Height class, e.g. "h-12" or "h-14" */
  className?: string;
}

/**
 * Reusable UK postcode input with debounced validation via postcodes.io.
 * Shows the resolved place name alongside the postcode when valid.
 */
const PostcodeInput = ({
  value,
  onChange,
  onValidationChange,
  placeholder = "e.g. EX37 9HW",
  className = "h-12",
}: PostcodeInputProps) => {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [placeName, setPlaceName] = useState("");

  // Use a ref to always call the latest callback without re-triggering the effect
  const validationRef = useRef(onValidationChange);
  validationRef.current = onValidationChange;

  useEffect(() => {
    const postcode = value.trim();
    if (!postcode) {
      setPlaceName("");
      setError("");
      validationRef.current(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsValidating(true);
      setError("");

      const result = await validateUKPostcode(postcode);

      setPlaceName(result.placeName);
      setError(result.error);
      validationRef.current(result.isValid);
      setIsValidating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className={`text-base ${className} ${placeName ? "text-transparent caret-black" : ""}`}
          placeholder={placeholder}
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
};

export default PostcodeInput;
