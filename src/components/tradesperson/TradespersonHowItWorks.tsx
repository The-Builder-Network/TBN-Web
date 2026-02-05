import { Smartphone, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Smartphone,
    title: "Receive tailored leads",
    description:
      "Set up your free professional profile and we'll send you leads that match your skills and work area.",
    step: 1,
  },
  {
    icon: User,
    title: "Express interest",
    description:
      "Respond to as many leads as you like. Based on your profile, work history and reviews, customers decide who to share their details with.",
    step: 2,
  },
  {
    icon: MessageSquare,
    title: "Connect and arrange",
    description:
      "If you're shortlisted, we charge you a fee for the customer's contact details so you can get in touch to exchange more details about the job.",
    step: 3,
  },
];

const TradespersonHowItWorks = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-16 text-center">
          How to find the work you want
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
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
          <Button size="lg" className="px-8 font-bold">
            Sign up for free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TradespersonHowItWorks;
