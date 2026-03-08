import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";
import PostcodeInput from "@/components/shared/PostcodeInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TradespersonHero = () => {
  const [selectedTrade, setSelectedTrade] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = EMAIL_REGEX.test(email);
  const emailError = emailTouched && !emailValid && email.length > 0;
  const canSubmit = !!selectedTrade && postcodeValid && emailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: wire up actual registration flow
    console.log("Tradesperson sign-up:", { selectedTrade, postcode, email });
  };

  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden pattern">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-12 items-center">
          {/* Left Column: Text and Form */}
          <div className="space-y-12 col-span-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background">
              The reliable way to get
              <br /> the work you want
            </h1>

            <div className="bg-card w-fit border rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">View local trade work</h2>

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
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Your email to receive leads"
                    type="email"
                    className={`h-14 text-lg ${emailError ? "border-destructive" : ""}`}
                  />
                  {emailError && (
                    <p className="text-xs text-destructive">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  By clicking Sign up for free, you agree to The Builder Network{" "}
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
  );
};

export default TradespersonHero;
