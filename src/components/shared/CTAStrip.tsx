import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTAStripProps {
  text: string;
  /** Route path, or a mailto: link */
  to: string;
}

const CTAStrip = ({ text, to }: CTAStripProps) => {
  const className =
    "flex items-center justify-between hover:opacity-90 transition-opacity";
  const content = (
    <>
      <span className="text-2xl font-bold">{text}</span>
      <ArrowRight className="h-8 w-8 hover:translate-x-1 transition-transform" />
    </>
  );

  return (
    <div className="bg-primary text-primary-foreground py-4 shadow-lg">
      <div className="container">
        {to.startsWith("mailto:") ? (
          <a href={to} className={className}>
            {content}
          </a>
        ) : (
          <Link to={to} className={className}>
            {content}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CTAStrip;
