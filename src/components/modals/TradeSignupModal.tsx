import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRegister, checkPhoneApi } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import PasswordField from "@/components/shared/PasswordField";
import UKPhoneField from "@/components/shared/UKPhoneField";
import { isValidUKLocal } from "@/helpers/ukPhoneHelper";
import { useNavigate } from "react-router-dom";

interface TradeSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pre-fill email from the hero form */
  email: string;
  /** Pre-fill postcode from the hero form — stored so work-area tab can autofill */
  postcode: string;
  /** Pre-fill trade from the hero form */
  trade: string;
}

const TradeSignupModal = ({
  open,
  onOpenChange,
  email,
  postcode,
  trade,
}: TradeSignupModalProps) => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneExists, setPhoneExists] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const phoneDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced phone existence check
  useEffect(() => {
    setPhoneExists(false);
    setErrors((p) => ({ ...p, phone: "" }));

    if (!isValidUKLocal(phone)) return;

    const fullPhone = `+44${phone.replace(/\s/g, "")}`;

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
        // silently ignore
      } finally {
        setIsCheckingPhone(false);
      }
    }, 600);

    return () => {
      if (phoneDebounceRef.current) clearTimeout(phoneDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim() || firstName.trim().length > 50)
      e.firstName = "First name is required (max 50 chars)";
    if (!lastName.trim() || lastName.trim().length > 50)
      e.lastName = "Last name is required (max 50 chars)";
    if (!isValidUKLocal(phone)) e.phone = "Enter a valid UK phone number";
    else if (phoneExists)
      e.phone = "This phone number is already registered. Please log in.";
    if (password.length < 6 || password.length > 128)
      e.password = "Password must be 6–128 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    register(
      {
        email,
        password,
        name: `${firstName.trim()} ${lastName.trim()}`,
        role: "TRADESPERSON",
        phone: `+44${phone.replace(/\s/g, "")}`,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          navigate(
            `/tradesperson/profile?tab=company-details&postcode=${encodeURIComponent(postcode)}&trade=${encodeURIComponent(trade)}`,
          );
        },
        onError: (err: unknown) => {
          const message =
            (err as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Registration failed. Please try again.";
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gap-0 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">
            Create a tradesperson account
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            You're almost there — just fill in a few details to get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email — read-only, pre-filled */}
          <div className="space-y-1.5">
            <Label>Email address</Label>
            <Input
              value={email}
              readOnly
              className="bg-muted cursor-not-allowed"
              tabIndex={-1}
            />
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>
                First name <span className="text-destructive">*</span>
              </Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className={errors.firstName ? "border-destructive" : ""}
                autoFocus
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>
                Last name <span className="text-destructive">*</span>
              </Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Smith"
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <UKPhoneField
            label="Phone number"
            required
            value={phone}
            onChange={(v) => {
              setPhone(v);
              setPhoneExists(false);
              setErrors((p) => ({ ...p, phone: "" }));
            }}
            error={isCheckingPhone ? undefined : errors.phone}
          />
          {isCheckingPhone && (
            <p className="text-xs text-muted-foreground -mt-3 flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Checking…
            </p>
          )}

          {/* Password */}
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            error={errors.password}
          />

          <Button
            type="submit"
            className="w-full h-12 font-bold mt-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TradeSignupModal;
