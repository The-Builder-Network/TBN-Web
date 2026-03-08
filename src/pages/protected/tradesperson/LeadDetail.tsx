import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LeadDetail = () => {
  const { leadId } = useParams<{ leadId: string }>();

  return (
    <div className="container py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/tradesperson/my-leads">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Leads
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-4">Lead #{leadId}</h1>

      {/* Placeholder — will be populated with real lead data */}
      <div className="border rounded-lg p-8 space-y-4">
        <p className="text-muted-foreground">
          Lead details, homeowner info, and response options will appear here.
        </p>
      </div>
    </div>
  );
};

export default LeadDetail;
