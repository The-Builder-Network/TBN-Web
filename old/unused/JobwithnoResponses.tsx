import { Link, useParams } from "react-router-dom";
import { ChevronRight, MessageSquare, Clock, MapPin, Calendar } from "lucide-react";

const JobResponses = () => {
  const { jobId } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-primary hover:underline mb-4 inline-flex items-center gap-1">
        &lsaquo; My jobs
      </Link>

      <h1 className="text-2xl font-bold mt-2 mb-1">Responses to your job: Security Systems Installation</h1>
      <div className="flex items-center gap-4 text-sm text-primary mb-8">
        <Link to="#" className="hover:underline">View details</Link>
        <span className="text-muted-foreground">|</span>
        <Link to="#" className="hover:underline">Edit</Link>
        <span className="text-muted-foreground">|</span>
        <Link to="#" className="hover:underline">Close job</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-lg p-5">
            <h3 className="font-bold mb-2">My chats</h3>
            <p className="text-sm text-muted-foreground">
              You haven't started a chat with any tradespeople yet. Start a chat to get your job done soon.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-bold mb-2">Interested tradespeople</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Tradespeople interested in your job will show here.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Waiting for more tradespeople
            </div>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-bold mb-2">Get more responses</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Invite 10 more recommended tradespeople to get more responses.
            </p>
            <Link
              to={`/jobs/${jobId}/recommended`}
              className="text-sm font-bold text-foreground hover:underline flex items-center gap-1"
            >
              View recommended tradespeople
              <span className="text-xs">↗</span>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> 0 responses
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> 8 Mar 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Umberleigh
            </span>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Job description</h3>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="text-muted-foreground w-40 flex-shrink-0">Job ID:</span>
                <span>15167089</span>
              </div>
              <div className="flex">
                <span className="text-muted-foreground w-40 flex-shrink-0">Job type:</span>
                <span>Security Systems</span>
              </div>
              <div className="flex">
                <span className="text-muted-foreground w-40 flex-shrink-0">System type:</span>
                <span>Entry system</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-1">Customer description:</p>
              <p className="text-sm">
                Looking for a professional to install a complete security system including entry system, cameras, and monitoring setup for a residential property.
              </p>
            </div>

            <div className="mt-4 bg-secondary/50 rounded-lg p-4">
              <p className="text-sm">
                <span className="text-primary font-medium">Invite</span>{" "}
                10 more tradespeople to get more responses.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-primary mt-6">
            <Link to="#" className="block px-4 py-3 text-sm font-semibold hover:bg-secondary/50 flex items-center justify-between">
              View details <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="#" className="block px-4 py-3 text-sm font-semibold hover:bg-secondary/50 flex items-center justify-between border-t">
              Edit <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="#" className="block px-4 py-3 text-sm font-semibold hover:bg-secondary/50 flex items-center justify-between border-t">
              Close job <span className="text-xs">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobResponses;
