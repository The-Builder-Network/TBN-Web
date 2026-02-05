import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PostJobStrip = () => {
  return (
    <div className="bg-primary text-primary-foreground py-4 shadow-lg">
      <div className="container">
        <Link
          to="/post-job"
          className="flex items-center justify-between hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl font-bold">Post your job now</span>
          <ArrowRight className="h-8 w-8 hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PostJobStrip;
