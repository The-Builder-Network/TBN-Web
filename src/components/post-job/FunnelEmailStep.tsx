import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { api } from "@/api/client";
import { useLogin } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface FunnelEmailStepProps {
  serviceName: string;
  onNext: (email: string, existingUser: boolean) => void;
  onLoginSuccess: (email: string) => void;
  onBack: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Homeowner email capture step.
 * - Debounces email → calls /auth/check-email (shows loader inside input)
 * - Existing user: password field slides in for inline login
 * - New user: calls onNext(email, false) → FunnelAccountStep
 */
const FunnelEmailStep = ({
  onNext,
  onLoginSuccess,
  onBack,
}: FunnelEmailStepProps) => {
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [existingUser, setExistingUser] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { login } = useAuth();
  const { mutate: loginMutate, isPending: isLoggingIn } = useLogin();
  const { toast } = useToast();

  const emailValid = EMAIL_RE.test(email);

  // Debounced email existence check
  useEffect(() => {
    // Reset existing-user state when email changes
    setExistingUser(null);
    setPassword("");
    setPasswordError("");

    if (!emailValid) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsChecking(true);
      try {
        const res = await api.post<{ exists: boolean }>("/auth/check-email", {
          email,
        });
        setExistingUser(res.data.exists);
      } catch {
        setExistingUser(false);
      } finally {
        setIsChecking(false);
      }
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handleContinue = () => {
    if (existingUser) {
      // Existing user — log them in then post the job
      if (!password) {
        setPasswordError("Please enter your password");
        return;
      }
      loginMutate(
        { email, password },
        {
          onSuccess: (data) => {
            login(data.user);
            onLoginSuccess(email);
          },
          onError: () => {
            setPasswordError("Incorrect password. Please try again.");
          },
        },
      );
    } else {
      // New user — go to account creation
      onNext(email, false);
    }
  };

  const handleBack = () => {
    if (existingUser !== null) {
      // Password is visible — go back to email-only mode
      setExistingUser(null);
      setPassword("");
      setPasswordError("");
    } else {
      onBack();
    }
  };

  const canContinue =
    emailValid &&
    !isChecking &&
    existingUser !== null &&
    (existingUser ? password.length > 0 : true);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        Get responses from tradespeople near you
      </h2>
      <p className="text-muted-foreground mb-6 text-sm">
        We will only share your contact details with tradespeople you choose to
        talk to.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="fe-email" className="text-sm font-medium block mb-1.5">Email</label>
          <div className="relative">
            <Input
              id="fe-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="your@email.com"
              className="h-12 text-base pr-10"
              autoFocus
            />
            {isChecking && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Password field — shown when email belongs to an existing user */}
        {existingUser === true && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label htmlFor="fe-password" className="text-sm font-medium block mb-1.5">Password</label>
            <div className="relative">
              <Input
                id="fe-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Your password"
                className="h-12 text-base pr-12"
                autoFocus
                onKeyDown={(e) =>
                  e.key === "Enter" && canContinue && handleContinue()
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-destructive mt-1">{passwordError}</p>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={handleBack} className="h-11 px-6">
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!canContinue || isLoggingIn}
            className="h-11 px-6"
          >
            {isLoggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : existingUser === true ? (
              "Log in & post job"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FunnelEmailStep;
