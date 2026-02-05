import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Check,
  ChevronsUpDown,
  ChevronLeft,
  ArrowRight,
  Upload,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

type FormData = {
  category: string;
  serviceType: string;
  projectType: string;
  description: string;
  headline: string;
  photos: File[];
  postcode: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  marketing: boolean;
};

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    serviceType: "",
    projectType: "",
    description: "",
    headline: "",
    photos: [],
    postcode: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    marketing: false,
  });
  const [openCombobox, setOpenCombobox] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle URL category parameter
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      if (services.includes(categoryParam)) {
        setFormData((prev) => ({ ...prev, category: categoryParam }));
        setStep(2);
      } else {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("category");
          return newParams;
        });
      }
    }
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 2 && formData.serviceType === "Structural calculations") {
      setStep(4);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step === 4 && formData.serviceType === "Structural calculations") {
      setStep(2);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleServiceTypeChange = (value: string) => {
    updateField("serviceType", value);
  };

  // Progress calculation
  const isStructural = formData.serviceType === "Structural calculations";
  const totalSteps = isStructural ? 8 : 9;

  const getCurrentStepIndex = () => {
    if (isStructural) {
      if (step >= 4) return step - 1;
      return step;
    }
    return step;
  };

  const progress = ((getCurrentStepIndex() - 1) / (totalSteps - 1)) * 95;

  const getTitle = () => {
    if (step === 8) return "Get responses from tradespeople near you";
    if (step === 9) return "Create an account to track your job";
    return formData.category ? `Post a ${formData.category} job` : "Post a job";
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          Get responses from MyBuilder's screened and reviewed tradespeople near
          you
        </p>
      </div>

      <div className="space-y-4">
        <Label className="text-md font-medium">
          What would you like to have done?{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCombobox}
              className="w-full justify-between h-12 text-base"
            >
              {formData.category
                ? services.find((service) => service === formData.category)
                : "Select a category..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {services.map((service) => (
                    <CommandItem
                      key={service}
                      value={service}
                      onSelect={(currentValue) => {
                        updateField(
                          "category",
                          currentValue === formData.category
                            ? ""
                            : currentValue,
                        );
                        setOpenCombobox(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          formData.category === service
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {service}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={nextStep}
        disabled={!formData.category}
      >
        Next
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label className="text-md font-medium">
          What type of service do you need?{" "}
          <span className="text-red-500">*</span>
        </Label>
      </div>

      <RadioGroup
        value={formData.serviceType}
        onValueChange={handleServiceTypeChange}
        className="space-y-2"
      >
        {[
          "Basic outline plans (for quotes and planning application)",
          "Full regulation plans (for builders & building regs)",
          "Structural calculations",
          "I'm not sure",
        ].map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2 border px-3 py-3 rounded-lg hover:bg-highlight/5 cursor-pointer transition-colors"
            onClick={() => handleServiceTypeChange(option)}
          >
            <RadioGroupItem value={option} id={option} />
            <Label
              htmlFor={option}
              className="flex-grow cursor-pointer font-normal text-base"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={nextStep}
          disabled={!formData.serviceType}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label className="text-md font-medium">
          What type of project are you planning?{" "}
          <span className="text-red-500">*</span>
        </Label>
      </div>

      <RadioGroup
        value={formData.projectType}
        onValueChange={(val) => updateField("projectType", val)}
        className="space-y-1"
      >
        {[
          "Extension",
          "Loft conversion",
          "Renovation",
          "New build",
          "Other",
        ].map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2 border px-3 py-3 rounded-lg hover:bg-highlight/5 cursor-pointer transition-colors"
            onClick={() => updateField("projectType", option)}
          >
            <RadioGroupItem value={option} id={option} />
            <Label
              htmlFor={option}
              className="flex-grow cursor-pointer font-normal text-base"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={nextStep}
          disabled={!formData.projectType}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label className="text-md font-medium">
          Add a description to your job <span className="text-red-500">*</span>
        </Label>
      </div>

      <Textarea
        placeholder="include any details you think the tradeperson should know (approx. structure, dimensions, timeframe, etc.)"
        className="min-h-[200px] text-base p-4"
        value={formData.description}
        onChange={(e) => updateField("description", e.target.value)}
      />

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={nextStep}
          disabled={!formData.description.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label className="text-md font-medium">
          Give your job a headline <span className="text-red-500">*</span>
        </Label>
        <p className="text-muted-foreground">
          More tradespeople express interest in jobs that have a descriptive
          name.
        </p>
      </div>

      <Input
        value={formData.headline}
        onChange={(e) => updateField("headline", e.target.value)}
        className="h-12 text-md"
        placeholder="e.g. Single storey extension in Exmouth"
      />

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={nextStep}
          disabled={!formData.headline.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label className="text-md font-medium">
          Would you like to add any photos or plans? (Optional)
        </Label>
        <p className="text-muted-foreground">
          Photos give tradespeople more context and details to understand the
          job and provide a more accurate quote.
        </p>
      </div>

      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-highlight/5 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-xs text-muted-foreground mb-2">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
        <Input type="file" className="hidden" multiple accept="image/*" />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button size="lg" className="flex-1" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label className="text-md font-medium">
          Postcode for the job <span className="text-red-500">*</span>
        </Label>
        <p className="text-muted-foreground">
          To find architectural designers near you we need to know where the job
          is.
        </p>
      </div>

      <Input
        value={formData.postcode}
        onChange={(e) => updateField("postcode", e.target.value.toUpperCase())}
        className="h-12 text-md w-1/2"
        placeholder="e.g. EX379HW"
      />

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={nextStep}
          disabled={!formData.postcode.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep8 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          We will only share your contact details with tradespeople you choose
          to talk to.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="h-12 text-md"
          placeholder="your@email.com"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={nextStep}
          disabled={!formData.email.trim() || !formData.email.includes("@")}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep9 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          We will only share your contact details with tradespeople you choose
          to talk to.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone number <span className="text-red-500">*</span>
        </Label>
        <div className="flex">
          <div className="flex items-center justify-center bg-muted px-4 border border-r-0 rounded-l-md text-muted-foreground">
            +44
          </div>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="h-12 rounded-l-none"
            placeholder="7700 900000"
          />
        </div>
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="marketing"
          checked={formData.marketing}
          onCheckedChange={(checked) =>
            updateField("marketing", checked as boolean)
          }
        />
        <label
          htmlFor="marketing"
          className="text-xs text-muted-foreground leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I would like to receive marketing communications about MyBuilder's
          services by email, SMS and/or phone and understand that I can
          unsubscribe at any time.
        </label>
      </div>

      <div className="pt-4 text-xs text-muted-foreground">
        By clicking Continue, you agree to MyBuilder's Terms and conditions. For
        information on how we process your data, see our Privacy policy.
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={prevStep}>
          Back
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={() => console.log(formData)}
          disabled={
            !formData.firstName || !formData.lastName || !formData.phone
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10 px-16">
        <div className="w-1/2">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{getTitle()}</h1>
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="font-medium">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
          {step === 7 && renderStep7()}
          {step === 8 && renderStep8()}
          {step === 9 && renderStep9()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJob;
