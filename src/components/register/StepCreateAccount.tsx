import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useRegister } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import PasswordField from "@/components/shared/PasswordField";
import UKPhoneField from "@/components/shared/UKPhoneField";
import { isValidUKLocal } from "@/helpers/ukPhoneHelper";

const StepCreateAccount = ({ data, onUpdate, onNext }) => {
  const email = (data.email as string) || "";
  const [firstName, setFirstName] = useState<string>(data.firstName || "");
  const [lastName, setLastName] = useState<string>(data.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data.phoneNumber || "",
  );
  const [password, setPassword] = useState<string>(data.password || "");
  const [marketing, setMarketing] = useState<boolean>(data.marketing || false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: register, isPending } = useRegister();
  const { toast } = useToast();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    if (!firstName.trim() || firstName.trim().length > 50)
      e.firstName = "First name is required (max 50 chars)";
    if (!lastName.trim() || lastName.trim().length > 50)
      e.lastName = "Last name is required (max 50 chars)";
    if (!isValidUKLocal(phoneNumber)) e.phone = "Enter a valid UK phone number";
    if (password.length < 6 || password.length > 128)
      e.password = "Password must be 6-128 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onUpdate({ email, firstName, lastName, phoneNumber, password, marketing });

    register(
      {
        email,
        password,
        name: `${firstName.trim()} ${lastName.trim()}`,
        role: "TRADESPERSON",
        phone: `+44${phoneNumber.replace(/\s/g, "")}`,
      },
      {
        onSuccess: () => onNext(),
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
  };

  const isValid =
    email.trim() &&
    firstName.trim() &&
    lastName.trim() &&
    isValidUKLocal(phoneNumber) &&
    password.length >= 6;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1.5">Create your account</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Sign up to be a trade member on MyBuilder.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email — pre-filled from URL, read-only */}
        <div>
          <label htmlFor="sc-email" className="text-sm font-medium block mb-1.5">
            Email address
          </label>
          <Input
            id="sc-email"
            value={email}
            readOnly
            type="email"
            className="text-base h-11 bg-muted cursor-default"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="sc-first-name" className="text-sm font-medium block mb-1.5">
            First name <span className="text-destructive">*</span>
          </label>
          <Input
            id="sc-first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.slice(0, 50))}
            className="text-base h-11"
            required
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="sc-last-name" className="text-sm font-medium block mb-1.5">
            Last name <span className="text-destructive">*</span>
          </label>
          <Input
            id="sc-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.slice(0, 50))}
            className="text-base h-11"
            required
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
          )}
        </div>

        <UKPhoneField
          value={phoneNumber}
          onChange={setPhoneNumber}
          label="Phone number"
          description="This is how customers will contact you. It won't be shared publicly."
          error={errors.phone}
          required
        />

        <PasswordField
          value={password}
          onChange={setPassword}
          label="Password"
          required
          error={errors.password}
        />

        <div className="flex items-start gap-3">
          <Checkbox
            id="marketing"
            checked={marketing}
            onCheckedChange={(checked) => setMarketing(!!checked)}
            className="mt-1"
          />
          <label htmlFor="marketing" className="text-sm leading-relaxed">
            I would like to receive marketing communications about MyBuilder
            services and offers by email, SMS and/or phone and understand that I
            can unsubscribe at any time.
          </label>
        </div>

        <Button
          type="submit"
          disabled={!isValid || isPending}
          className="h-11 px-8"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default StepCreateAccount;
