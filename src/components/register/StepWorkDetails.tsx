import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import TravelRadiusMap from "./TravelRadiusMap";

const PROFESSIONS = [
  "Plumber", "Electrician", "Carpenter & Joiner", "Painter & Decorator",
  "Builder", "Roofer", "Plasterer", "Tiler", "Landscaper", "Handyman",
  "Kitchen Fitter", "Bathroom Fitter", "Locksmith", "Bricklayer",
  "Flooring Specialist", "Window Fitter", "Gas Engineer", "Heating Engineer",
];

const BUSINESS_TYPES = [
  { value: "self-employed", label: "Self-Employed / Sole Trader" },
  { value: "limited-company", label: "Limited Company (LTD)" },
  { value: "ordinary-partnership", label: "Ordinary Partnership" },
  { value: "llp", label: "Limited Liability Partnership (LLP)" },
];



type SubStep = "about" | "professions" | "travel" | "business-type" | "business-details";

const StepWorkDetails = ({ data, onUpdate, onNext, onBack }) => {
  const [subStep, setSubStep] = useState<SubStep>("about");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(data.professions || []);
  const [travelRadius, setTravelRadius] = useState<number>(data.travelRadius || 25);
  const [workUK, setWorkUK] = useState(data.workUK || false);
  const [businessType, setBusinessType] = useState<string>(data.businessType || "");

  // Business details
  const [tradingName, setTradingName] = useState(data.tradingName || "");
  const [companyName, setCompanyName] = useState(data.companyName || "");
  const [companyRegNumber, setCompanyRegNumber] = useState(data.companyRegNumber || "");
  const [partnerNames, setPartnerNames] = useState(data.partnerNames || "");
  const [workAddress, setWorkAddress] = useState(data.workAddress || "");
  const [postcode, setPostcode] = useState(data.postcode || "EX379HW");

  const toggleProfession = (p: string) => {
    setSelectedProfessions((prev) => {
      if (prev.includes(p)) return prev.filter((x) => x !== p);
      if (prev.length >= 5) return prev;
      return [...prev, p];
    });
  };

  const isSoleTrader = businessType === "self-employed";

  const isBusinessDetailsValid = () => {
    if (!tradingName.trim()) return false;
    if (!workAddress.trim()) return false;
    if (!postcode.trim()) return false;
    if (!isSoleTrader) {
      if (!companyName.trim()) return false;
      if (!companyRegNumber.trim()) return false;
      if (businessType === "ordinary-partnership" || businessType === "llp") {
        if (!partnerNames.trim()) return false;
      }
    }
    return true;
  };

  const handleBusinessDetailsSubmit = () => {
    onUpdate({
      professions: selectedProfessions,
      travelRadius,
      workUK,
      businessType,
      tradingName,
      companyName,
      companyRegNumber,
      partnerNames,
      workAddress,
      postcode,
    });
    onNext();
  };

  if (subStep === "about") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-1">Tell us about yourself</h2>
        <p className="text-base text-muted-foreground mb-6">~ 2 mins</p>
        <p className="text-lg mb-4">
          Welcome, {data.firstName || "there"}! Let's get started.
        </p>
        <p className="text-lg mb-4">
          We want to know our tradespeople better so we can send you the right local leads, matched to your skills.
        </p>
        <p className="text-lg mb-8">
          In this step, we'll ask you about the work you undertake, your professional status, and location.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="h-12 px-6 text-base">Back</Button>
          <Button onClick={() => setSubStep("professions")} className="h-12 px-6 text-base">Continue</Button>
        </div>
      </div>
    );
  }

  if (subStep === "professions") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-2">Select your professions</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Choose exactly 5 professions ({selectedProfessions.length}/5 selected)
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {PROFESSIONS.map((p) => {
            const selected = selectedProfessions.includes(p);
            const disabled = !selected && selectedProfessions.length >= 5;
            return (
              <button
                key={p}
                onClick={() => toggleProfession(p)}
                disabled={disabled}
                className={`p-3 rounded-lg border text-left text-base transition-all ${
                  selected
                    ? "border-primary bg-primary/5 font-medium"
                    : disabled
                    ? "opacity-40 cursor-not-allowed border-border"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{p}</span>
                  {selected && <span className="text-primary text-lg">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSubStep("about")} className="h-12 px-6 text-base">Back</Button>
          <Button
            onClick={() => setSubStep("travel")}
            disabled={selectedProfessions.length !== 5}
            className="h-12 px-6 text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (subStep === "travel") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-2">How far can you travel for work?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Set the maximum distance you're willing to travel from your base location.
        </p>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-medium">I can work throughout the UK</span>
            <Switch checked={workUK} onCheckedChange={setWorkUK} />
          </div>
        </div>
        {!workUK && (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-medium">Travel radius</span>
                <span className="text-lg font-bold text-primary">{travelRadius} miles</span>
              </div>
              <Slider value={[travelRadius]} onValueChange={(v) => setTravelRadius(v[0])} min={5} max={100} step={5} className="mb-6" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5 miles</span>
                <span>100 miles</span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border mb-6" style={{ height: 350 }}>
              <TravelRadiusMap radius={travelRadius} center={[51.505, -0.09]} postcode={postcode} />
            </div>
          </>
        )}
        {workUK && (
          <div className="rounded-lg border p-6 bg-muted/30 text-center mb-6">
            <p className="text-lg text-muted-foreground">You'll receive leads from across the entire UK.</p>
          </div>
        )}
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSubStep("professions")} className="h-12 px-6 text-base">Back</Button>
          <Button onClick={() => setSubStep("business-type")} className="h-12 px-6 text-base">Continue</Button>
        </div>
      </div>
    );
  }

  if (subStep === "business-type") {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-2">What type of business do you have?</h2>
        <p className="text-lg text-muted-foreground mb-6">This helps us understand your business structure.</p>
        <RadioGroup value={businessType} onValueChange={setBusinessType} className="space-y-3 mb-8">
          {BUSINESS_TYPES.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                businessType === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value={opt.value} />
              <span className="text-base">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSubStep("travel")} className="h-12 px-6 text-base">Back</Button>
          <Button onClick={() => setSubStep("business-details")} disabled={!businessType} className="h-12 px-6 text-base">Continue</Button>
        </div>
      </div>
    );
  }

  // Business details
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Enter your business details</h2>
      <p className="text-lg text-muted-foreground mb-6">
        {isSoleTrader ? "We just need a few basic details." : "Please provide your company information."}
      </p>
      <form onSubmit={(e) => { e.preventDefault(); handleBusinessDetailsSubmit(); }} className="space-y-5">
        <div>
          <label className="text-base font-semibold block mb-2">Trading name <span className="text-highlight">*</span></label>
          <Input value={tradingName} onChange={(e) => setTradingName(e.target.value)} placeholder="Enter your trading name" className="text-base h-12" required />
        </div>

        {!isSoleTrader && (
          <>
            {(businessType === "ordinary-partnership" || businessType === "llp") && (
              <div>
                <label className="text-base font-semibold block mb-2">Full names of all partners <span className="text-highlight">*</span></label>
                <p className="text-sm text-muted-foreground mb-2">Comma-separated list of all names in partnership agreement, including yourself</p>
                <Input value={partnerNames} onChange={(e) => setPartnerNames(e.target.value)} placeholder="Enter partner names" className="text-base h-12" required />
              </div>
            )}
            <div>
              <label className="text-base font-semibold block mb-2">Registered company name <span className="text-highlight">*</span></label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter your registered company name" className="text-base h-12" required />
            </div>
            <div>
              <label className="text-base font-semibold block mb-2">Company registration number <span className="text-highlight">*</span></label>
              <Input value={companyRegNumber} onChange={(e) => setCompanyRegNumber(e.target.value)} placeholder="Enter your registration number" className="text-base h-12" required />
            </div>
          </>
        )}

        <div>
          <label className="text-base font-semibold block mb-2">Work address <span className="text-highlight">*</span></label>
          <Input value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} placeholder="Street and house number" className="text-base h-12" required />
        </div>

        <div>
          <label className="text-base font-semibold block mb-2">Postcode <span className="text-highlight">*</span></label>
          <div className="flex gap-2">
            <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} className="w-32 text-base h-12" required />
            <Input value="Umberleigh" disabled className="flex-1 text-base h-12 bg-muted" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => setSubStep("business-type")} className="h-12 px-6 text-base">Back</Button>
          <Button type="submit" disabled={!isBusinessDetailsValid()} className="h-12 px-6 text-base">Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default StepWorkDetails;
