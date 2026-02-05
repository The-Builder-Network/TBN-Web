import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  X, 
  MapPin, 
  Calendar,
  PoundSterling,
  CheckCircle,
  Hammer,
  Droplets,
  Zap,
  Home,
  Paintbrush,
  Trees
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const categories = [
  { id: "builders", name: "Builders", icon: Hammer },
  { id: "plumbers", name: "Plumbers", icon: Droplets },
  { id: "electricians", name: "Electricians", icon: Zap },
  { id: "roofers", name: "Roofers", icon: Home },
  { id: "painters", name: "Painters & Decorators", icon: Paintbrush },
  { id: "landscapers", name: "Landscapers", icon: Trees },
];

const budgetRanges = [
  { id: "under1k", label: "Under £1,000" },
  { id: "1k-5k", label: "£1,000 - £5,000" },
  { id: "5k-10k", label: "£5,000 - £10,000" },
  { id: "10k-25k", label: "£10,000 - £25,000" },
  { id: "25k-50k", label: "£25,000 - £50,000" },
  { id: "over50k", label: "Over £50,000" },
  { id: "unsure", label: "I'm not sure" },
];

const timeframes = [
  { id: "asap", label: "As soon as possible" },
  { id: "within-week", label: "Within a week" },
  { id: "within-month", label: "Within a month" },
  { id: "flexible", label: "I'm flexible" },
  { id: "specific", label: "Specific date" },
];

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    images: [] as string[],
    postcode: "",
    budget: "",
    timeframe: "",
    propertyType: "",
    email: "",
    phone: "",
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    navigate("/job-posted");
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
              <span className="font-medium">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">What type of work do you need?</h1>
                <p className="text-muted-foreground">Select the category that best describes your project</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:border-primary hover:shadow-md ${
                      formData.category === category.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border"
                    }`}
                  >
                    <category.icon className={`h-8 w-8 mx-auto mb-3 ${
                      formData.category === category.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <span className={`font-medium ${
                      formData.category === category.id ? "text-primary" : ""
                    }`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Job Details */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Describe your project</h1>
                <p className="text-muted-foreground">The more detail you provide, the better quotes you'll receive</p>
              </div>

              <div className="bg-card rounded-xl border p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Kitchen extension, Bathroom renovation"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you need done in as much detail as possible..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground">
                    Include dimensions, materials, any specific requirements, and current condition if applicable.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Photos (optional)</Label>
                  <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium mb-1">Drag and drop photos here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Timing */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Where and when?</h1>
                <p className="text-muted-foreground">Help us match you with local tradespeople</p>
              </div>

              <div className="bg-card rounded-xl border p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="postcode">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Postcode
                  </Label>
                  <Input
                    id="postcode"
                    placeholder="e.g., SW1A 1AA"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label>
                    <Calendar className="h-4 w-4 inline mr-2" />
                    When do you need this done?
                  </Label>
                  <RadioGroup
                    value={formData.timeframe}
                    onValueChange={(value) => setFormData({ ...formData, timeframe: value })}
                    className="grid gap-3"
                  >
                    {timeframes.map((tf) => (
                      <div
                        key={tf.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.timeframe === tf.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={tf.id} id={tf.id} />
                        <Label htmlFor={tf.id} className="cursor-pointer flex-1">
                          {tf.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">What's your budget?</h1>
                <p className="text-muted-foreground">This helps tradespeople provide accurate quotes</p>
              </div>

              <div className="bg-card rounded-xl border p-6">
                <RadioGroup
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  className="grid gap-3"
                >
                  {budgetRanges.map((range) => (
                    <div
                      key={range.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.budget === range.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={range.id} id={range.id} />
                      <Label htmlFor={range.id} className="cursor-pointer flex-1 flex items-center">
                        <PoundSterling className="h-4 w-4 mr-2 text-muted-foreground" />
                        {range.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 5: Contact Details */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Almost there!</h1>
                <p className="text-muted-foreground">Enter your contact details to receive quotes</p>
              </div>

              <div className="bg-card rounded-xl border p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="07xxx xxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm">Your details are only shared with tradespeople who quote</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm">No spam - we only email you about your job</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm">100% free service with no obligation</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button 
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.category) ||
                  (step === 2 && (!formData.title || !formData.description)) ||
                  (step === 3 && (!formData.postcode || !formData.timeframe)) ||
                  (step === 4 && !formData.budget)
                }
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!formData.email}
              >
                Post Job Free
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;