import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { X, Star, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Tradesperson {
  id: string;
  name: string;
  rating: number | null;
  reviewCount: number;
  distance: number;
  location: string;
}

const tradespeople: Tradesperson[] = [
  { id: "1", name: "Total electrical solutions southwest ltd", rating: null, reviewCount: 0, distance: 28, location: "Umberleigh" },
  { id: "2", name: "Moz safety & security", rating: 4.9, reviewCount: 85, distance: 37, location: "Umberleigh" },
  { id: "3", name: "Alarm South West", rating: 5, reviewCount: 5, distance: 13, location: "Umberleigh" },
  { id: "4", name: "MSK Handyman Services", rating: 5, reviewCount: 95, distance: 44, location: "Umberleigh" },
  { id: "5", name: "Meta Electrical Limited", rating: 4.9, reviewCount: 62, distance: 10, location: "Umberleigh" },
  { id: "6", name: "C.D Electrical", rating: 5, reviewCount: 53, distance: 13, location: "Umberleigh" },
  { id: "7", name: "Jack", rating: 4.9, reviewCount: 29, distance: 28, location: "Umberleigh" },
  { id: "8", name: "M Power Electrical Services", rating: 5, reviewCount: 4, distance: 28, location: "Umberleigh" },
  { id: "9", name: "M.May Electrical", rating: 5, reviewCount: 33, distance: 15, location: "Umberleigh" },
  { id: "10", name: "Cornwall Electrics", rating: 5, reviewCount: 1, distance: 44, location: "Umberleigh" },
  { id: "11", name: "Ben Vanstone", rating: null, reviewCount: 0, distance: 50, location: "Umberleigh" },
  { id: "12", name: "Alert guard fire and security Ltd", rating: null, reviewCount: 0, distance: 39, location: "Umberleigh" },
];

const RecommendedTradespeople = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5"]));
  const MAX = 10;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < MAX) next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recommended tradespeople near you</h1>
          <p className="text-sm mt-1">
            <span className="font-medium">Select up to {MAX} tradespeople</span>{" "}
            <span className="text-primary">and invite them to respond to your job.</span>
          </p>
        </div>
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tradespeople.map((tp) => (
          <button
            key={tp.id}
            onClick={() => toggle(tp.id)}
            className={`border rounded-lg p-4 text-left transition-all ${
              selected.has(tp.id) ? "border-primary ring-1 ring-primary" : "hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                  {tp.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{tp.name}</p>
                  {tp.rating ? (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 star-filled fill-current" />
                      <span className="text-xs font-medium">{tp.rating}/5</span>
                      <span className="text-xs text-muted-foreground">({tp.reviewCount} reviews)</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-0.5">No reviews yet</p>
                  )}
                </div>
              </div>
              <Checkbox checked={selected.has(tp.id)} className="mt-1" />
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Active within {tp.distance} miles of {tp.location}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="border rounded-lg px-6 py-2 text-sm font-medium hover:bg-secondary transition-colors">
          Show more
        </button>
      </div>

      <div className="mt-8">
        <p className="font-semibold text-sm mb-1">Not ready to invite tradespeople yet?</p>
        <Link to="/" className="text-sm text-primary hover:underline flex items-center gap-1">
          ➡ Skip for now
        </Link>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-medium">{selected.size}/{MAX} selected</p>
        <Button disabled={selected.size === 0}>
          Send {selected.size} invites
        </Button>
      </div>
    </div>
  );
};

export default RecommendedTradespeople;
