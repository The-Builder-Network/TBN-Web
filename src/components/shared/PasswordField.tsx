import { useState, useId } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  /** Show the strength indicator and checklist. Default: true */
  showStrengthIndicator?: boolean;
  autoFocus?: boolean;
}

interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  numberOrSpecial: boolean;
}

function getStrength(password: string): {
  checks: PasswordChecks;
  score: number;
} {
  const checks: PasswordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    numberOrSpecial: /[0-9!@#$%^&*()_+\-=[\]{}|;':",.<>?/]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score };
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Strong"];
const STRENGTH_COLORS = [
  "",
  "text-red-500",
  "text-amber-600",
  "text-green-600",
];
const STRENGTH_BAR_COLORS = ["", "bg-red-500", "bg-amber-500", "bg-green-500"];

export default function PasswordField({
  value,
  onChange,
  label = "Password",
  placeholder = "Create your password",
  required,
  error,
  showStrengthIndicator = true,
  autoFocus,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const { checks, score } = getStrength(value);
  const hasInput = value.length > 0;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium block mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <Input
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 128))}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="h-12 text-base pr-12"
          autoFocus={autoFocus}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Strength bar + label */}
      {showStrengthIndicator && hasInput && (
        <div className="mt-2 space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  i <= score ? STRENGTH_BAR_COLORS[score] : "bg-muted",
                )}
              />
            ))}
          </div>
          {score > 0 && (
            <p className={cn("text-xs font-medium", STRENGTH_COLORS[score])}>
              {STRENGTH_LABELS[score]}
            </p>
          )}
        </div>
      )}

      {/* Checklist */}
      {showStrengthIndicator && hasInput && (
        <div className="mt-2 space-y-1">
          <CheckItem done={checks.length}>At least 8 characters</CheckItem>
          <CheckItem done={checks.uppercase}>One uppercase letter</CheckItem>
          <CheckItem done={checks.numberOrSpecial}>
            One number or special character
          </CheckItem>
        </div>
      )}

      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function CheckItem({
  done,
  children,
}: {
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs transition-colors",
        done ? "text-green-600" : "text-muted-foreground",
      )}
    >
      <Check
        className={cn(
          "h-3 w-3 transition-opacity",
          done ? "opacity-100" : "opacity-30",
        )}
      />
      {children}
    </div>
  );
}
