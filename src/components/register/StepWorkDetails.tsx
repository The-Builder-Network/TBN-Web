import { useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import TravelRadiusMap from "./TravelRadiusMap";
import PostcodeInput from "@/components/shared/PostcodeInput";
import { trades } from "@/constants/trades";
import { useLeadsCount } from "@/api/leads";

// All trade names deduplicated and sorted
const ALL_TRADES = Array.from(
  new Map(trades.map((t) => [t.name, t.name])).values(),
).sort();

const BUSINESS_TYPES = [
  { value: "self-employed", label: "Self-employed / sole trader" },
  { value: "limited-company", label: "Limited company (LTD)" },
  { value: "ordinary-partnership", label: "Ordinary partnership" },
  { value: "llp", label: "Limited liability partnership (LLP)" },
];

type SubStep =
  | "about"
  | "professions"
  | "travel"
  | "business-type"
  | "business-details";

const StepWorkDetails = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: Record<string, unknown>;
  onUpdate: (d: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const [subStep, setSubStep] = useState<SubStep>("about");
  const [, setSearchParams] = useSearchParams();

  // Professions
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>(
    (data.professions as string[]) || [],
  );
  const listRef = useRef<HTMLDivElement>(null);

  // Travel radius
  const [travelRadius, setTravelRadius] = useState<number>(
    (data.travelRadius as number) || 30,
  );
  const [workUK, setWorkUK] = useState(!!data.workUK);

  // Postcode — editable, synced to URL
  const [postcode, setPostcode] = useState((data.postcode as string) || "");
  const [postcodeValid, setPostcodeValid] = useState(false);
  const mapCenter: [number, number] = (data.mapCenter as [number, number]) || [
    51.505, -0.09,
  ];

  const handlePostcodeChange = (val: string) => {
    setPostcode(val);
    onUpdate({ postcode: val });
    // Update URL query param so /join?postcode= stays in sync
    setSearchParams(
      (prev) => {
        prev.set("postcode", val);
        return prev;
      },
      { replace: true },
    );
  };

  // Business
  const [businessType, setBusinessType] = useState<string>(
    (data.businessType as string) || "",
  );
  const [tradingName, setTradingName] = useState(
    (data.tradingName as string) || "",
  );
  const [companyName, setCompanyName] = useState(
    (data.companyName as string) || "",
  );
  const [companyRegNumber, setCompanyRegNumber] = useState(
    (data.companyRegNumber as string) || "",
  );
  const [partnerNames, setPartnerNames] = useState(
    (data.partnerNames as string) || "",
  );
  const [workAddress, setWorkAddress] = useState(
    (data.workAddress as string) || "",
  );

  // Live leads count
  const { data: leadsCount = 0 } = useLeadsCount(postcode, travelRadius);

  const userName = data.firstName
    ? `${data.firstName} ${data.lastName || ""}`.trim().toUpperCase()
    : "there";

  // Filtered trades for search
  const filteredTrades = useMemo(() => {
    if (!searchQuery.trim()) return ALL_TRADES;
    const q = searchQuery.toLowerCase();
    return ALL_TRADES.filter((t) => t.toLowerCase().includes(q));
  }, [searchQuery]);

  const toggleProfession = (name: string) => {
    setSelectedProfessions((prev) => {
      if (prev.includes(name)) return prev.filter((x) => x !== name);
      if (prev.length >= 5) return prev;
      return [...prev, name];
    });
  };

  const isSoleTrader = businessType === "self-employed";

  const isBusinessDetailsValid = () => {
    if (!tradingName.trim() || !workAddress.trim() || !postcode.trim())
      return false;
    if (!isSoleTrader) {
      if (!companyName.trim() || !companyRegNumber.trim()) return false;
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

  // ── About ──────────────────────────────────────────────────
  if (subStep === "about") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-1">Tell us about yourself</h2>
        <p className="text-sm text-muted-foreground mb-6">~ 2 mins</p>
        <p className="text-sm mb-4">Welcome! Let's get started.</p>
        <p className="text-sm mb-4">
          We want to know our tradespeople better so we can send you the right
          local leads, matched to your skills.
        </p>
        <p className="text-sm mb-8">
          In this step, we'll ask you about the work you undertake, your
          professional status, and location.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="h-11 px-6">
            Back
          </Button>
          <Button
            onClick={() => setSubStep("professions")}
            className="h-11 px-6"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (subStep === "professions") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Select up to 5 professions</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tell us what you do so we can send you the most relevant leads.
        </p>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="i.e Gardener"
            className="pl-9 pr-9 h-11"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Selected count badge */}
        {selectedProfessions.length > 0 && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-muted-foreground">
              Selected
            </span>
            <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
              {selectedProfessions.length}
            </span>
          </div>
        )}

        {/* Trade list with scroll arrows */}
        <div className="relative mb-6">
          <button
            type="button"
            onClick={() =>
              listRef.current?.scrollBy({ top: -80, behavior: "smooth" })
            }
            className="absolute -top-5 right-0 z-10 text-muted-foreground hover:text-foreground"
            aria-label="Scroll up"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <div
            ref={listRef}
            className="space-y-1 max-h-80 overflow-y-auto pr-1"
          >
            {filteredTrades.map((tradeName) => {
              const selected = selectedProfessions.includes(tradeName);
              const disabled = !selected && selectedProfessions.length >= 5;
              return (
                <div
                  key={tradeName}
                  onClick={() => !disabled && toggleProfession(tradeName)}
                  className={`flex items-center gap-3 border px-3 py-3 rounded-lg transition-colors ${
                    disabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-accent/50 cursor-pointer"
                  } ${selected ? "border-primary/70 bg-accent/30" : "border-border"}`}
                >
                  <Checkbox
                    checked={selected}
                    disabled={disabled}
                    onCheckedChange={() =>
                      !disabled && toggleProfession(tradeName)
                    }
                    className="rounded-sm pointer-events-none"
                  />
                  <span className="text-sm">{tradeName}</span>
                </div>
              );
            })}
            {filteredTrades.length === 0 && (
              <p className="text-center text-muted-foreground py-6 text-sm">
                No trades match "{searchQuery}"
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              listRef.current?.scrollBy({ top: 80, behavior: "smooth" })
            }
            className="absolute -bottom-5 right-0 z-10 text-muted-foreground hover:text-foreground"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setSubStep("about")}
            className="h-11 px-6"
          >
            Back
          </Button>
          <Button
            onClick={() => setSubStep("travel")}
            disabled={selectedProfessions.length === 0}
            className="h-11 px-6"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // ── Travel radius ──────────────────────────────────────────
  if (subStep === "travel") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">
          How far can you travel for work?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Set the maximum distance you are willing to travel from{" "}
          <strong>{postcode}</strong>.
        </p>
        <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full mb-5">
          {leadsCount} leads in your work area
        </div>
        {!workUK && (
          <>
            <p className="text-sm font-semibold mb-4">
              Travel distance from {postcode}
            </p>
            <div className="relative mb-5">
              <div
                className="absolute -top-7 text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded"
                style={{
                  left: `calc(${((travelRadius - 5) / 95) * 100}% - 20px)`,
                }}
              >
                {travelRadius} miles
              </div>
              <Slider
                value={[travelRadius]}
                onValueChange={(v) => setTravelRadius(v[0])}
                min={5}
                max={100}
                step={5}
              />
            </div>
            <div
              className="rounded-lg overflow-hidden border mb-5"
              style={{ height: 280 }}
            >
              <TravelRadiusMap
                radius={travelRadius}
                center={mapCenter}
                postcode={postcode}
              />
            </div>
          </>
        )}
        <div
          className={`flex items-center gap-3 border px-3 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/50 mb-6 ${workUK ? "border-primary/70 bg-accent/30" : "border-border"}`}
          onClick={() => setWorkUK((v) => !v)}
        >
          <Checkbox
            checked={workUK}
            onCheckedChange={(c) => setWorkUK(!!c)}
            className="pointer-events-none"
          />
          <span className="text-sm">I work throughout the UK</span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setSubStep("professions")}
            className="h-11 px-6"
          >
            Back
          </Button>
          <Button
            onClick={() => setSubStep("business-type")}
            className="h-11 px-6"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // ── Business type ──────────────────────────────────────────
  if (subStep === "business-type") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">
          What type of business do you have?
        </h2>
        <div className="space-y-2 mb-8">
          {BUSINESS_TYPES.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center gap-3 border px-3 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                businessType === opt.value
                  ? "border-primary/70 bg-accent/30"
                  : "border-border"
              }`}
              onClick={() => setBusinessType(opt.value)}
            >
              <div
                className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  businessType === opt.value
                    ? "border-primary"
                    : "border-muted-foreground/40"
                }`}
              >
                {businessType === opt.value && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm">{opt.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setSubStep("travel")}
            className="h-11 px-6"
          >
            Back
          </Button>
          <Button
            onClick={() => setSubStep("business-details")}
            disabled={!businessType}
            className="h-11 px-6"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // ── Business details ───────────────────────────────────────
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Enter your business details</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {isSoleTrader
          ? "We just need a few basic details."
          : "Please provide your company information."}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBusinessDetailsSubmit();
        }}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="wd-trading-name"
            className="text-sm font-medium block mb-1.5"
          >
            Trading name <span className="text-destructive">*</span>
          </label>
          <Input
            id="wd-trading-name"
            value={tradingName}
            onChange={(e) => setTradingName(e.target.value)}
            placeholder="Enter your trading name"
            className="text-base h-12"
            required
          />
        </div>
        {!isSoleTrader && (
          <>
            {(businessType === "ordinary-partnership" ||
              businessType === "llp") && (
              <div>
                <label
                  htmlFor="wd-partner-names"
                  className="text-sm font-medium block mb-1.5"
                >
                  Full names of all partners{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  id="wd-partner-names"
                  value={partnerNames}
                  onChange={(e) => setPartnerNames(e.target.value)}
                  placeholder="Comma-separated partner names"
                  className="text-base h-12"
                  required
                />
              </div>
            )}
            <div>
              <label
                htmlFor="wd-company-name"
                className="text-sm font-medium block mb-1.5"
              >
                Registered company name{" "}
                <span className="text-destructive">*</span>
              </label>
              <Input
                id="wd-company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your registered company name"
                className="text-base h-12"
                required
              />
            </div>
            <div>
              <label
                htmlFor="wd-company-reg"
                className="text-sm font-medium block mb-1.5"
              >
                Company registration number{" "}
                <span className="text-destructive">*</span>
              </label>
              <Input
                id="wd-company-reg"
                value={companyRegNumber}
                onChange={(e) => setCompanyRegNumber(e.target.value)}
                placeholder="e.g. 12345678"
                className="text-base h-12"
                required
              />
            </div>
          </>
        )}
        <div>
          <label
            htmlFor="wd-work-address"
            className="text-sm font-medium block mb-1.5"
          >
            Work address <span className="text-destructive">*</span>
          </label>
          <Input
            id="wd-work-address"
            value={workAddress}
            onChange={(e) => setWorkAddress(e.target.value)}
            placeholder="Street and house number"
            className="text-base h-12"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">
            Postcode <span className="text-destructive">*</span>
          </label>
          <PostcodeInput
            value={postcode}
            onChange={handlePostcodeChange}
            onValidationChange={setPostcodeValid}
            className="h-12"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSubStep("business-type")}
            className="h-11 px-6"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!isBusinessDetailsValid()}
            className="h-11 px-6"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepWorkDetails;
