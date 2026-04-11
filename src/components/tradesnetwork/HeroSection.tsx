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
      <section
        className="pt-20 bg-background overflow-hidden pattern"
        style={{
          height: "calc(100vh - 4rem)", // Full viewport height minus header
        }}
      >
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-12 items-center">
            {/* Left Column: Text and Form */}
            <div className="space-y-12 col-span-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background">
                The reliable way to get
                <br /> the work you want
              </h1>

              <div className="bg-card w-fit border rounded-xl shadow-sm p-6 md:p-8">
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
                        triggerClassName="h-14 text-base"
                      />
                    </div>
                    <div className="w-full sm:w-2/5">
                      <Label className="text-sm font-medium mb-1.5 block">
                        Postcode <span className="text-destructive">*</span>
                      </Label>
                      <PostcodeInput
                        value={postcode}
                        onChange={setPostcode}
                        onValidationChange={setPostcodeValid}
                        placeholder="e.g. SW1A 1AA"
                        className="h-14"
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
                        className={`h-14 text-lg pr-10 ${emailFormatError || emailExists ? "border-destructive" : ""}`}
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
                    className="w-full h-14 font-bold"
                    size="lg"
                    disabled={!canSubmit}
                  >
                    Sign up for free
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative hidden lg:block col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/trades_hero_section_img_1.jpg"
                  alt="Tradesperson working"
                  className="aspect-square object-cover"
                />

                {/* Overlay Label */}
                <div className="absolute bottom-36 left-56 bg-highlight text-black px-4 py-2 rounded-md font-bold shadow-lg flex items-center gap-2">
                  <span>Krystian ★ 4.9/5</span>
                </div>

                {/* Green Bounding Box Effect */}
                <div className="absolute top-10 left-56 right-12 bottom-36 border-2 border-highlight pointer-events-none rounded-lg"></div>
              </div>
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
