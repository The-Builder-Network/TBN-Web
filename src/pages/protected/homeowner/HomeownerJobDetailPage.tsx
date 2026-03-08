import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeownerJobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();

  return (
    <div className="container py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/homeowner/my-jobs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Jobs
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-4">Job #{jobId}</h1>

      {/* Placeholder — will be populated with real job data */}
      <div className="border rounded-lg p-8 space-y-4">
        <p className="text-muted-foreground">
          Job details, tradesperson responses, and messaging will appear here.
        </p>
      </div>
    </div>
  );
};

export default HomeownerJobDetail;
