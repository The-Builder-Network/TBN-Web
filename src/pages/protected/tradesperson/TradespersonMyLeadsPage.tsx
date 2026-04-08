import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, MapPin, Clock, Wrench, ChevronDown } from "lucide-react";

const LEADS = [
  { id: 1, title: "Structural engineer", category: "Architecture", location: "Edinburgh", distance: 333, time: "1 hr ago" },
  { id: 2, title: "Server room wiring", category: "Architecture", location: "St James, London", distance: 0, time: "1 hr ago" },
  { id: 3, title: "Planning service for Internal alterations and loft conversation.", category: "Architecture", location: "Rom ford", distance: 12, time: "4 hr ago" },
  { id: 4, title: "Loft conversion", category: "Architecture", location: "Coat bridge", distance: 344, time: "9 hr ago" },
  { id: 5, title: "Wall Alteration", category: "Architecture", location: "Eastbound", distance: 53, time: "10 hr ago" },
  { id: 6, title: "Structural review before removing walls", category: "Architecture", location: "Cinder ford", distance: 104, time: "11 hr ago" },
  { id: 7, title: "Small job, small wall removal", category: "Architecture", location: "Birmingham", distance: 186, time: "3 days ago" },
];

const NewLeads = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

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
            <button onClick={() => navigate("/newleads")} className="text-base font-medium text-primary">New leads</button>
            <button onClick={() => navigate("/activity")} className="text-base text-muted-foreground hover:text-foreground">Activity</button>
            <button onClick={() => navigate("/contacts")} className="text-base text-muted-foreground hover:text-foreground">Contacts</button>
            <button onClick={() => navigate("/profile")} className="text-base text-muted-foreground hover:text-foreground border rounded-full px-3 py-1">My account 👤</button>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">New leads</h1>

        {/* Registration banner */}
        <div className="bg-primary text-primary-foreground rounded-lg p-4 mb-6 flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-400 rounded" />
          <span className="text-base">Complete your free registration to express interest. <button onClick={() => navigate("/register")} className="underline font-medium">Complete now</button></span>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, location, or material"
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button className="h-12 px-6 text-base">Search</Button>
          <Button variant="outline" className="h-12 px-4 text-base gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full border text-sm transition-all ${
              activeFilter === "all" ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
            }`}
          >
            All leads
          </button>
          <button
            onClick={() => setActiveFilter("low")}
            className={`px-4 py-2 rounded-full border text-sm transition-all ${
              activeFilter === "low" ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
            }`}
          >
            Low Competition
          </button>
        </div>

        {/* Leads list */}
        <div className="space-y-3">
          {LEADS.map((lead) => (
            <div key={lead.id} className="border-l-4 border-l-highlight/60 bg-card rounded-lg p-5 hover:shadow-sm transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-highlight mb-2">{lead.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Wrench className="h-4 w-4" /> {lead.category}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {lead.location} ({lead.distance} miles)</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {lead.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewLeads;
