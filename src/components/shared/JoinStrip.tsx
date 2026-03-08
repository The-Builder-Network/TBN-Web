import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const JoinStrip = () => {
  return (
    <div className="bg-primary text-primary-foreground py-4 shadow-lg">
      <div className="container">
        <Link
          to="/tradesnetwork"
          className="flex items-center justify-between hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl font-bold">Sign up for free</span>
          <ArrowRight className="h-8 w-8 hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default JoinStrip;
