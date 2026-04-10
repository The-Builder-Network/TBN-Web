import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "boneyard-js/react";
import { Search, MapPin, Clock, Wrench, AlertCircle } from "lucide-react";
import { useLeads } from "@/api/leads";
import { services } from "@/constants/services";
import type { LeadSummary } from "@/api/types";

function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

const NewLeads = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | undefined>();
  const [maxDistance, setMaxDistance] = useState<number | undefined>();

  const { data, isLoading, error, refetch } = useLeads({
    status: "AVAILABLE",
    serviceSlug: serviceFilter,
    maxDistanceMiles: maxDistance,
    sort: "createdAt",
    order: "desc",
  });

  const allLeads = data?.data ?? [];

  // Client-side keyword filter on top of server results
  const leads = searchQuery.trim()
    ? allLeads.filter(
        (l) =>
          l.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.job.placeName?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allLeads;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Leads | The Builder Network</title>
        <meta
          name="description"
          content="Browse and manage available leads near you on Builder Network."
        />
      </Helmet>

      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">New leads</h1>

        {/* Search */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword or location"
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button className="h-12 px-6 text-base">Search</Button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <Select
            value={serviceFilter ?? "all"}
            onValueChange={(v) => setServiceFilter(v === "all" ? undefined : v)}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All services</SelectItem>
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={maxDistance !== undefined ? String(maxDistance) : "any"}
            onValueChange={(v) =>
              setMaxDistance(v === "any" ? undefined : Number(v))
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Any distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any distance</SelectItem>
              <SelectItem value="10">Within 10 miles</SelectItem>
              <SelectItem value="25">Within 25 miles</SelectItem>
              <SelectItem value="50">Within 50 miles</SelectItem>
              <SelectItem value="100">Within 100 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading */}
        <Skeleton name="leads-list" loading={isLoading}>
          {/* Error */}
          {!isLoading && error && (
            <div className="border rounded-lg p-12 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
              <p className="font-semibold mb-2">Failed to load leads</p>
              <Button variant="outline" onClick={() => void refetch()}>
                Try again
              </Button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && leads.length === 0 && (
            <div className="border rounded-lg p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="font-semibold mb-1">No leads found</p>
              <p className="text-sm text-muted-foreground">
                {serviceFilter || maxDistance
                  ? "Try adjusting your filters."
                  : "There are no available leads matching your profile right now. Check back soon."}
              </p>
            </div>
          )}

          {/* Leads list */}
          {!isLoading && !error && leads.length > 0 && (
            <div className="space-y-3">
              {leads.map((lead: LeadSummary) => (
                <button
                  key={lead.id}
                  className="w-full text-left border-l-4 border-l-highlight/60 bg-card rounded-lg p-5 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => navigate(`/tradesperson/my-leads/${lead.id}`)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-highlight mb-2 truncate">
                        {lead.job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Wrench className="h-4 w-4" />
                          {lead.job.serviceSlug.replace(/-/g, " ")}
                        </span>
                        {lead.job.placeName && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {lead.job.placeName}
                            {lead.distanceMiles !== undefined && (
                              <span className="ml-0.5">
                                ({Math.round(lead.distanceMiles)} mi)
                              </span>
                            )}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatTimeAgo(lead.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-medium text-foreground">
                        {lead.creditCost} credits
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default NewLeads;
