import { ClipboardList, Users, MessageSquare, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Post Your Job",
    description: "Describe your project in detail. It only takes a few minutes and it's completely free.",
    step: 1,
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "We'll match you with up to 3 vetted, reviewed tradespeople in your area.",
    step: 2,
  },
  {
    icon: MessageSquare,
    title: "Compare Quotes",
    description: "Review profiles, read reviews, and compare quotes to find the best fit.",
    step: 3,
  },
  {
    icon: ThumbsUp,
    title: "Hire with Confidence",
    description: "Choose your tradesperson and get your project done with our money-back guarantee.",
    step: 4,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How BuilderHub Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your project done has never been easier. Here's how it works in 4 simple steps.
          </p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              <div className="relative text-center">
                {/* Step Number */}
                <div className="relative inline-flex">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 mx-auto">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
