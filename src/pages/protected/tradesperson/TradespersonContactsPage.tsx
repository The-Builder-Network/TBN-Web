import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FolderOpen, MessageCircle, Archive } from "lucide-react";

const TradesPersonContactsPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"messages" | "archive">("messages");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Nav */}
      <div className="border-b px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-highlight text-2xl font-bold">⑦</span>
            <span className="text-xl font-bold">THE BUILDER NETWORK</span>
          </div>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => navigate("/newleads")}
              className="text-base text-muted-foreground hover:text-foreground"
            >
              New leads
            </button>
            <button
              onClick={() => navigate("/activity")}
              className="text-base text-muted-foreground hover:text-foreground"
            >
              Activity
            </button>
            <button
              onClick={() => navigate("/contacts")}
              className="text-base font-medium text-primary"
            >
              Contacts
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="text-base text-muted-foreground hover:text-foreground border rounded-full px-3 py-1"
            >
              My account 👤
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Contacts</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-12">
          <button
            onClick={() => setTab("messages")}
            className={`flex items-center gap-2 pb-3 text-base font-medium transition-all ${
              tab === "messages"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="h-5 w-5" /> Messages
          </button>
          <button
            onClick={() => setTab("archive")}
            className={`flex items-center gap-2 pb-3 text-base font-medium transition-all ${
              tab === "archive"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Archive className="h-5 w-5" /> Archive
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <FolderOpen className="h-10 w-10 text-green-600" />
          </div>
          {tab === "messages" ? (
            <>
              <h2 className="text-2xl font-bold mb-3">
                No contact details shared yet
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                When customers want to get in touch with you, their contact
                details are displayed here.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3">No archived messages</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Archived messages will appear here.
              </p>
            </>
          )}
          <Button
            onClick={() => navigate("/newleads")}
            className="h-12 px-8 text-base"
          >
            View new leads
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradesPersonContactsPage;
