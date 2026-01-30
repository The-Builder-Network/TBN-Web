import { ClipboardList, Users, MessageSquare, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Post your job",
    description: "Tell us what you need done. It takes just a few minutes.",
    step: 1,
  },
  {
    icon: Users,
    title: "Get matched",
    description: "We'll match you with up to 3 interested tradespeople.",
    step: 2,
  },
  {
    icon: MessageSquare,
    title: "Compare quotes",
    description: "Chat with tradespeople, compare quotes and profiles.",
    step: 3,
  },
  {
    icon: ThumbsUp,
    title: "Hire with confidence",
    description: "Choose a tradesperson and get your job done.",
    step: 4,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
          How it works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-4">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
