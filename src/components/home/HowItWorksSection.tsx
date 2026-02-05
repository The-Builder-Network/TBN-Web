import { Link } from "react-router-dom";
import { ClipboardList, Users, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-16 text-center">
          How to find the right tradesperson
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 p-10 rounded-full bg-primary text-primary-foreground mb-4">
                <step.icon className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-md text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/how-it-works">See How it works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
