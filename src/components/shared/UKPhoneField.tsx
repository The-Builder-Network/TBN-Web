import { useId } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface UKPhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

/**
 * UK phone number input with a non-editable +44 prefix.
 * Value stored without +44 (10-digit local number, e.g. "7911 123456").
 * Full number for API = "+44" + value.replace(/\s/g, "")
 */
export default function UKPhoneField({
  value,
  onChange,
  label = "Phone number",
  description,
  error,
  required,
  className,
}: UKPhoneFieldProps) {
  const inputId = useId();
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium block mb-1.5">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
      )}
      <div className="flex">
        <div
          className={cn(
            "flex items-center justify-center border rounded-l-md border-r-0 bg-muted px-3 h-12 text-sm font-semibold text-foreground select-none min-w-[58px]",
          )}
          aria-hidden="true"
        >
          +44
        </div>
        <Input
          id={inputId}
          type="tel"
          value={value}
          onChange={(e) => {
            // Allow digits and spaces only
            const clean = e.target.value.replace(/[^\d\s]/g, "");
            onChange(clean);
          }}
          placeholder="7911 123456"
          className="h-12 text-base flex-1 rounded-l-none"
        />
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
