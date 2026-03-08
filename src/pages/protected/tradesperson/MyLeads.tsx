import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";

const MyLeads = () => {
  const { user } = useAuth();

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Leads</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name ?? "there"}
          </p>
        </div>
        <Button variant="outline">Filter leads</Button>
      </div>

      {/* Placeholder — will be replaced with real leads list */}
      <div className="border rounded-lg p-12 text-center space-y-4">
        <Inbox className="h-12 w-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-semibold">No leads yet</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          New job leads matching your trade and location will appear here. Make
          sure your profile is complete to receive the best matches.
        </p>
      </div>
    </div>
  );
};

export default MyLeads;
