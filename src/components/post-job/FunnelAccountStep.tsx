import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useRegister, checkPhoneApi } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import PasswordField from "@/components/shared/PasswordField";
import UKPhoneField from "@/components/shared/UKPhoneField";
import { isValidUKLocal } from "@/helpers/ukPhoneHelper";

interface FunnelAccountStepProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

/**
 * Homeowner account-creation step — injected into the job funnel.
 * Collects: full name, phone, password, marketing opt-in.
 */
const FunnelAccountStep = ({
  email,
  onSuccess,
  onBack,
}: FunnelAccountStepProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneExists, setPhoneExists] = useState<boolean>(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const phoneDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { mutate: register, isPending } = useRegister();
  const { toast } = useToast();

  // Debounced phone existence check
  useEffect(() => {
    setPhoneExists(false);
    setErrors((p) => ({ ...p, phone: "" }));

    if (!isValidUKLocal(phone)) return;

    const fullPhone = "+44" + phone.replace(/\s/g, "");

    if (phoneDebounceRef.current) clearTimeout(phoneDebounceRef.current);
    phoneDebounceRef.current = setTimeout(async () => {
      setIsCheckingPhone(true);
      try {
        const res = await checkPhoneApi(fullPhone);
        if (res.exists) {
          setPhoneExists(true);
          setErrors((p) => ({
            ...p,
            phone: "This phone number is already registered. Please log in.",
          }));
        }
      } catch {
        // silently ignore network errors
      } finally {
        setIsCheckingPhone(false);
      }
    }, 600);

    return () => {
      if (phoneDebounceRef.current) clearTimeout(phoneDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length > 100) {
      e.name = "Please enter your name";
    }
    if (!isValidUKLocal(phone)) {
      e.phone = "Enter a valid UK phone number";
    } else if (phoneExists) {
      e.phone = "This phone number is already registered. Please log in.";
    }
    if (password.length < 8) {
      e.password = "Password must be at least 8 characters";
    }
    if (!marketing) {
      e.marketing = "Please accept marketing communications to continue.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isFormValid =
    name.trim().length > 0 &&
    phone.replace(/\s/g, "").length >= 10 &&
    password.length >= 8 &&
    marketing &&
    !phoneExists &&
    !isCheckingPhone;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    register(
      {
        email,
        password,
        name: name.trim(),
        role: "HOMEOWNER",
        phone: "+44" + phone.replace(/\s/g, ""),
      },
      {
        onSuccess: () => onSuccess(),
        onError: (err: unknown) => {
          const message =
            (err as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Registration failed. Please try again.";
          if (message.toLowerCase().includes("already")) {
            toast({
              title: "Account already exists",
              description: "Please log in to post your job.",
            });
          } else {
            toast({
              title: "Could not create account",
              description: message,
              variant: "destructive",
            });
          }
        },
      },
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        Create an account to track your job
      </h2>
      <p className="text-muted-foreground mb-6 text-sm">
        We will only share your contact details with tradespeople you choose to
        talk to.
      </p>

      <form onSubmit={handleContinue} className="space-y-5">
        {/* Pre-filled email — read-only display */}
        <div>
          <label
            htmlFor="fa-email"
            className="text-sm font-medium block mb-1.5"
          >
            Email
          </label>
          <Input
            id="fa-email"
            value={email}
            readOnly
            className="h-12 text-base bg-muted text-muted-foreground"
          />
        </div>

        <div>
          <label htmlFor="fa-name" className="text-sm font-medium block mb-1.5">
            Full name <span className="text-destructive">*</span>
          </label>
          <Input
            id="fa-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value.slice(0, 100));
              setErrors((p) => ({ ...p, name: "" }));
            }}
            placeholder="Your full name"
            className="h-12 text-base"
            autoFocus
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        <UKPhoneField
          value={phone}
          onChange={(v) => {
            setPhone(v);
            setPhoneExists(false);
            setErrors((p) => ({ ...p, phone: "" }));
          }}
          required
          error={
            isCheckingPhone
              ? undefined
              : errors.phone
          }
        />
        {isCheckingPhone && (
          <p className="text-xs text-muted-foreground -mt-4 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Checking…
          </p>
        )}

        <PasswordField
          value={password}
          onChange={(v) => {
            setPassword(v);
            setErrors((p) => ({ ...p, password: "" }));
          }}
          label="Password"
          required
          placeholder="Create your password"
          error={errors.password}
        />

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={marketing}
            onCheckedChange={(c) => setMarketing(!!c)}
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed text-muted-foreground">
            I would like to receive marketing communications about The Builder
            Network's services by email, SMS and/or phone and understand that I
            can unsubscribe at any time.
          </span>
        </label>

        <p className="text-xs text-muted-foreground">
          By clicking Continue, you agree to The Builder Network's{" "}
          <Link to="/terms" target="_blank" className="underline">
            Terms and conditions
          </Link>
          . For information on how we process your data, see our{" "}
          <Link to="/privacy" target="_blank" className="underline">
            Privacy policy
          </Link>
          .
        </p>

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11 px-6"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isPending}
            className="h-11 px-6"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FunnelAccountStep;
