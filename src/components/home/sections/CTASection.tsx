import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostJobStrip from "../../shared/PostJobStrip";

const CTASection = ({ title }) => {
  return (
    <section className="pt-16 bg-muted">
      <div className="container flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground mb-14">
          Post your job for free and get matched with qualified tradespeople in
          your area.
        </p>
      </div>
      <PostJobStrip />
    </section>
  );
};

export default CTASection;
