import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const MyJobs = () => {
  const { user } = useAuth();

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name ?? "there"}
          </p>
        </div>
        <Button asChild>
          <Link to="/post-job">Post a new job</Link>
        </Button>
      </div>

      {/* Placeholder — will be replaced with real job list */}
      <div className="border rounded-lg p-12 text-center space-y-4">
        <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-semibold">No jobs yet</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Once you post a job, it will appear here so you can track responses
          from tradespeople.
        </p>
        <Button asChild>
          <Link to="/post-job">Post your first job</Link>
        </Button>
      </div>
    </div>
  );
};

export default MyJobs;
