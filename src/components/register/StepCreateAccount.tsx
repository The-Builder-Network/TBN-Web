import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";


const UK_PHONE_REGEX = /^(\+44\s?|0)(\d\s?){9,10}$/;

const StepCreateAccount = ({ data, onUpdate, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState(data.firstName || "");
  const [lastName, setLastName] = useState(data.lastName || "");
  const [phoneCode, setPhoneCode] = useState(data.phoneCode || "+44");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [password, setPassword] = useState(data.password || "");
  const [marketing, setMarketing] = useState(data.marketing || false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim() || firstName.trim().length > 50)
      e.firstName = "First name is required (max 50 chars)";
    if (!lastName.trim() || lastName.trim().length > 50)
      e.lastName = "Last name is required (max 50 chars)";
    const fullPhone = phoneCode + phoneNumber.replace(/\s/g, "");
    if (
      !UK_PHONE_REGEX.test(fullPhone) &&
      !UK_PHONE_REGEX.test("0" + phoneNumber.replace(/\s/g, ""))
    ) {
      e.phone = "Enter a valid UK phone number";
    }
    if (password.length < 6 || password.length > 128)
      e.password = "Password must be 6-128 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onUpdate({
      firstName,
      lastName,
      phoneCode,
      phoneNumber,
      password,
      marketing,
    });
    onNext();
  };

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    phoneNumber.trim() &&
    password.length >= 6;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Create your account</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Sign up to be a trade member on MyBuilder.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-base font-semibold block mb-2">
            First name <span className="text-highlight">*</span>
          </label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.slice(0, 50))}
            className="text-base h-12"
            required
          />
          {errors.firstName && (
            <p className="text-sm text-highlight mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="text-base font-semibold block mb-2">
            Last name <span className="text-highlight">*</span>
          </label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value.slice(0, 50))}
            className="text-base h-12"
            required
          />
          {errors.lastName && (
            <p className="text-sm text-highlight mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="text-base font-semibold block mb-2">
            Phone number <span className="text-highlight">*</span>
          </label>
          <p className="text-sm text-muted-foreground mb-2">
            This is how customers will contact you. It won't be shared publicly.
          </p>
          <div className="flex gap-2">
            <Input
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="w-20 text-base h-12 text-center"
            />
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 text-base h-12"
              type="tel"
              placeholder="7911 123456"
              required
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-highlight mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="text-base font-semibold block mb-2">
            Password (6-128 characters){" "}
            <span className="text-highlight">*</span>
          </label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value.slice(0, 128))}
              type={showPassword ? "text" : "password"}
              placeholder="Create your password"
              className="text-base h-12 pr-12"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-highlight mt-1">{errors.password}</p>
          )}
        </div>

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
          disabled={!isValid}
          className="h-12 px-8 text-base"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default StepCreateAccount;
