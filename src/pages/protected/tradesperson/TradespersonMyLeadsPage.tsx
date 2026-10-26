import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "boneyard-js/react";
import {
  Search,
  MapPin,
  Clock,
  Wrench,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useLeads, useLeadSummary } from "@/api/leads";
import { useMyProfile, useRefreshLeads } from "@/api/users";
import { services } from "@/constants/services";
import type { LeadStatus, LeadSummary, LeadTab } from "@/api/types";

const TABS: { id: LeadTab; label: string }[] = [
  { id: "new", label: "New" },
  { id: "interested", label: "Interested" },
  { id: "shortlisted", label: "Shortlisted" },
  { id: "hired", label: "Hired" },
  { id: "archived", label: "Archived" },
];

const STATUS_LABEL: Record<LeadStatus, string> = {
  AVAILABLE: "New",
  INTERESTED: "Waiting for customer",
  SHORTLISTED: "Shortlisted",
  HIRED: "Hired",
  DECLINED: "Declined",
  WITHDRAWN: "Withdrawn",
  NOT_SELECTED: "Not selected",
  EXPIRED: "Expired",
};

function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

function VerificationBanner({ status }: { status?: string }) {
  if (!status || status === "APPROVED") return null;
  const message =
    status === "PENDING"
      ? "Your profile is being reviewed. You can preview leads now and respond once you're verified — usually within 2 working days."
      : status === "SUSPENDED"
        ? "Your account is suspended. Please contact support@thebuildernetwork.com."
        : "You can preview leads, but you need to get verified before you can respond to customers.";
  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      {message}{" "}
      {status !== "PENDING" && status !== "SUSPENDED" && (
        <Link to="/tradesperson/profile?tab=verification" className="font-semibold underline">
          Get verified
        </Link>
      )}
    </div>
  );
}

const MyLeads = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = TABS.find((t) => t.id === params.get("tab"))?.id ?? "new";
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | undefined>();
  const [maxDistance, setMaxDistance] = useState<number | undefined>();

  const { data, isLoading, error, refetch } = useLeads({
    tab,
    serviceSlug: serviceFilter,
    maxDistanceMiles: maxDistance,
    sort: "createdAt",
    order: "desc",
    page,
  });
  const { data: counts } = useLeadSummary();
  const { data: profile } = useMyProfile();
  const { mutate: refreshLeads, isPending: isRefreshing } = useRefreshLeads();

  // On first mount, backfill any existing jobs that match this tradesperson's profile
  useEffect(() => {
    refreshLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allLeads = data?.data ?? [];
  const q = searchQuery.trim().toLowerCase();
  // Client-side keyword filter on top of server results
  const leads = q
    ? allLeads.filter(
        (l) =>
          l.job.title.toLowerCase().includes(q) ||
          (l.job.placeName ?? l.job.postcodeDistrict ?? "").toLowerCase().includes(q),
      )
    : allLeads;
  const filtered = !!(serviceFilter || maxDistance);

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My leads</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshLeads()}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        <VerificationBanner status={profile?.verificationStatus} />

        <div role="tablist" aria-label="Lead status" className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {TABS.map((t) => (
            <Button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              variant={tab === t.id ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => {
                setPage(1);
                setParams(t.id === "new" ? {} : { tab: t.id });
              }}
            >
              {t.label}
              {!!counts?.[t.id] && (
                <span className="ml-1.5 rounded-full bg-background/20 px-1.5 text-xs">
                  {counts[t.id]}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by keyword or location"
            aria-label="Filter leads by keyword or location"
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Select
            value={serviceFilter ?? "all"}
            onValueChange={(v) => {
              setPage(1);
              setServiceFilter(v === "all" ? undefined : v);
            }}
          >
            <SelectTrigger className="w-56" aria-label="Service">
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
            onValueChange={(v) => {
              setPage(1);
              setMaxDistance(v === "any" ? undefined : Number(v));
            }}
          >
            <SelectTrigger className="w-44" aria-label="Distance">
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

        <Skeleton name="leads-list" loading={isLoading}>
          {!isLoading && error && (
            <div className="border rounded-lg p-12 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
              <p className="font-semibold mb-2">Failed to load leads</p>
              <Button variant="outline" onClick={() => void refetch()}>
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !error && leads.length === 0 && (
            <div className="border rounded-lg p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="font-semibold mb-1">No leads found</p>
              <p className="text-sm text-muted-foreground mb-4">
                {filtered
                  ? "Try adjusting your filters."
                  : tab !== "new"
                    ? "Nothing here yet."
                    : "Make sure you've added your services and saved your work area on your profile, then click Refresh."}
              </p>
              {!filtered && tab === "new" && (
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/tradesperson/profile?tab=services")}
                  >
                    Add services
                  </Button>
                  <Button size="sm" onClick={() => refreshLeads()} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh leads
                  </Button>
                </div>
              )}
            </div>
          )}

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
                        <span className="flex items-center gap-1 capitalize">
                          <Wrench className="h-4 w-4" />
                          {lead.job.serviceSlug.replace(/-/g, " ")}
                        </span>
                        {(lead.job.placeName || lead.job.postcodeDistrict) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {lead.job.placeName ?? lead.job.postcodeDistrict}
                            {lead.distanceMiles != null && (
                              <span className="ml-0.5">({Math.round(lead.distanceMiles)} mi)</span>
                            )}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatTimeAgo(lead.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                      {lead.invited && <Badge className="bg-highlight text-white">Invited</Badge>}
                      {tab !== "new" && <Badge variant="outline">{STATUS_LABEL[lead.status]}</Badge>}
                      <span className="text-sm font-medium text-foreground">
                        {lead.creditsCharged || lead.creditCost} credits
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {data && data.meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {data.meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= data.meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default MyLeads;
