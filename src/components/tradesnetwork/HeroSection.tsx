import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";
import PostcodeInput from "@/components/shared/PostcodeInput";
import { api } from "@/api/client";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/modals/LoginModal";
import TradeSignupModal from "@/components/modals/TradeSignupModal";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TradespersonHero = () => {
  const { isAuthenticated, logout } = useAuth();
  const [selectedTrade, setSelectedTrade] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emailValid = EMAIL_REGEX.test(email);
  const emailFormatError = emailTouched && !emailValid && email.length > 0;

  // Debounced email existence check for the tradesperson signup form
  useEffect(() => {
    setEmailExists(false);
    if (!emailValid) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsCheckingEmail(true);
      try {
        const res = await api.post<{ exists: boolean }>("/auth/check-email", {
          email,
        });
        setEmailExists(res.data.exists);
      } catch {
        setEmailExists(false);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const canSubmit =
    !!selectedTrade &&
    postcodeValid &&
    emailValid &&
    !isCheckingEmail &&
    !emailExists;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (isAuthenticated) {
      await logout();
    }
    setSignupModalOpen(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        {/* Photo fades into the brand blue on the left */}
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <img
            src="/images/new-images/trades-hero.webp"
            alt="Smiling tradesperson on a ladder with a toolbox"
            className="h-full w-full object-cover object-[78%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
        </div>

        <div className="container relative py-12 md:py-16 lg:min-h-[600px] lg:py-20">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-primary-foreground sm:text-5xl">
              Your next great
              <br /> job starts here.
            </h1>

            <div className="mt-8 rounded-xl bg-card p-5 shadow-xl shadow-foreground/10 sm:p-7">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <Label className="text-sm font-medium mb-1.5 block">
                      Your main trade{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <JobServiceCombobox
                      value={selectedTrade}
                      onChange={setSelectedTrade}
                      placeholder="Select your trade"
                      triggerClassName="h-12 text-base"
                    />
                  </div>
                  <div className="w-full sm:w-[42%]">
                    <Label className="text-sm font-medium mb-1.5 block">
                      Postcode <span className="text-destructive">*</span>
                    </Label>
                    <PostcodeInput
                      value={postcode}
                      onChange={setPostcode}
                      onValidationChange={setPostcodeValid}
                      placeholder="e.g. SW1A 1AA"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Email to receive leads{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.toLowerCase());
                        setEmailExists(false);
                      }}
                      onBlur={() => setEmailTouched(true)}
                      placeholder="Your email to receive leads"
                      type="email"
                      className={`h-12 text-base pr-10 ${emailFormatError || emailExists ? "border-destructive" : ""}`}
                    />
                    {isCheckingEmail && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  {emailFormatError && (
                    <p className="text-xs text-destructive">
                      Please enter a valid email address
                    </p>
                  )}
                  {emailExists && !isCheckingEmail && (
                    <p className="text-xs text-destructive">
                      An account with this email already exists.{" "}
                      <button
                        type="button"
                        onClick={() => setLoginModalOpen(true)}
                        className="underline font-medium"
                      >
                        Log in instead
                      </button>
                    </p>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  By clicking Sign up for free, you agree to The Builder
                  Network{" "}
                  <Link to="/terms" className="underline">
                    Terms and Conditions
                  </Link>
                  .
                  <br />
                  For information on how we process your data, see our{" "}
                  <Link to="/privacy" className="underline">
                    Privacy policy
                  </Link>
                  .
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 font-semibold"
                  size="lg"
                  disabled={!canSubmit}
                >
                  Sign up for free
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <TradeSignupModal
        open={signupModalOpen}
        onOpenChange={setSignupModalOpen}
        email={email}
        postcode={postcode}
        trade={selectedTrade}
      />
    </>
  );
};

export default TradespersonHero;
