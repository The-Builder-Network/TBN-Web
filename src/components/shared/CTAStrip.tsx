import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTAStripProps {
  text: string;
  to: string;
}

/**
 * Shared call-to-action strip banner — replaces JoinStrip and PostJobStrip.
 */
const CTAStrip = ({ text, to }: CTAStripProps) => {
  return (
    <div className="bg-primary text-primary-foreground py-4 shadow-lg">
      <div className="container">
        <Link
          to={to}
          className="flex items-center justify-between hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl font-bold">{text}</span>
          <ArrowRight className="h-8 w-8 hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CTAStrip;
