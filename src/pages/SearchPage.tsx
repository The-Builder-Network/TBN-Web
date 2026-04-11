import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  MapPin,
  Star,
  X,
  SlidersHorizontal,
  CheckCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSearchTradespeople } from "@/api/search";
import { services } from "@/constants/services";

// ── Card skeleton ─────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="border rounded-xl p-5 flex flex-col gap-3 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="h-14 w-14 rounded-xl bg-muted shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-4 bg-muted rounded w-32" />
        <div className="h-3 bg-muted rounded w-24" />
        <div className="h-3 bg-muted rounded w-16" />
      </div>
    </div>
    <div className="h-3 bg-muted rounded w-28" />
    <div className="flex gap-2">
      <div className="h-5 bg-muted rounded-full w-20" />
      <div className="h-5 bg-muted rounded-full w-16" />
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [serviceSlug, setServiceSlug] = useState(
    searchParams.get("service") ?? "",
  );
  const [postcode, setPostcode] = useState(searchParams.get("postcode") ?? "");
  const [guaranteeOnly, setGuaranteeOnly] = useState(false);

  // Debounced / committed filter values sent to API
  const [activeQuery, setActiveQuery] = useState(query);
  const [activeService, setActiveService] = useState(serviceSlug);
  const [activePostcode, setActivePostcode] = useState(postcode);
  const [activeGuarantee, setActiveGuarantee] = useState(false);

  const { data, isLoading, isFetching } = useSearchTradespeople({
    query: activeQuery || undefined,
    serviceSlug: activeService || undefined,
    postcode: activePostcode || undefined,
    guarantee: activeGuarantee || undefined,
  });

  const hasActiveFilters = !!(
    activeQuery ||
    activeService ||
    activePostcode ||
    activeGuarantee
  );

  // Sync URL → state when params change externally (e.g. navigation)
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const svc = searchParams.get("service") ?? "";
    const pc = searchParams.get("postcode") ?? "";
    setQuery(q);
    setServiceSlug(svc);
    setPostcode(pc);
    setActiveQuery(q);
    setActiveService(svc);
    setActivePostcode(pc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = () => {
    setActiveQuery(query);
    setActiveService(serviceSlug);
    setActivePostcode(postcode);
    setActiveGuarantee(guaranteeOnly);

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (serviceSlug) params.set("service", serviceSlug);
    if (postcode) params.set("postcode", postcode);
    setSearchParams(params, { replace: true });
  };

  const handleClear = () => {
    setQuery("");
    setServiceSlug("");
    setPostcode("");
    setGuaranteeOnly(false);
    setActiveQuery("");
    setActiveService("");
    setActivePostcode("");
    setActiveGuarantee(false);
    setSearchParams({}, { replace: true });
  };

  const results = data?.data ?? [];
  const total = data?.meta.total ?? results.length;
  const showSkeleton = isLoading || isFetching;

  return (
    <>
      <Helmet>
        <title>Find Tradespeople | The Builder Network</title>
        <meta
          name="description"
          content="Search verified tradespeople near you. Filter by trade, service, and postcode."
        />
      </Helmet>

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-1">Find Tradespeople</h1>
        <p className="text-muted-foreground mb-8">
          Browse verified tradespeople near you.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="border rounded-xl p-5 space-y-5 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Clear all
                  </button>
                )}
              </div>

              <Separator />

              {/* Name / text search */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Name or trade
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                    placeholder="Search..."
                    className="pl-8 h-9 text-sm"
                  />
                </div>
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Service
                </Label>
                <Select
                  value={serviceSlug || "_all"}
                  onValueChange={(val) =>
                    setServiceSlug(val === "_all" ? "" : val)
                  }
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="All services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">All services</SelectItem>
                    {services.map((s) => (
                      <SelectItem key={s.slug} value={s.slug}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Postcode */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Postcode
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                    placeholder="e.g. SW1A 1AA"
                    className="pl-8 h-9 text-sm"
                    maxLength={8}
                  />
                </div>
              </div>

              <Separator />

              {/* Guarantee */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="guarantee"
                  checked={guaranteeOnly}
                  onCheckedChange={(v) => setGuaranteeOnly(!!v)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="guarantee"
                  className="text-sm cursor-pointer leading-snug"
                >
                  <span className="font-medium">Guarantee offered</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    Only show tradespeople who offer a workmanship guarantee
                  </span>
                </Label>
              </div>

              <Button onClick={applyFilters} className="w-full h-9 text-sm">
                Apply filters
              </Button>
            </div>
          </aside>

          {/* ── Results ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <p className="text-sm text-muted-foreground mb-4">
              {showSkeleton ? (
                <span className="inline-block h-4 w-32 bg-muted rounded animate-pulse" />
              ) : (
                <>
                  {total} tradesperson{total !== 1 ? "s" : ""}
                  {hasActiveFilters ? " matching your filters" : " available"}
                </>
              )}
            </p>

            {/* Cards grid */}
            {showSkeleton ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  No tradespeople found
                </h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or broadening your search.
                </p>
                <Button variant="outline" onClick={handleClear}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((tp) => (
                  <Link
                    key={tp.userId}
                    to={`/tradesperson/${tp.username}`}
                    className="group border rounded-xl p-5 hover:border-primary/60 hover:shadow-md transition-all flex flex-col gap-3 bg-card"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <Avatar className="h-14 w-14 rounded-xl">
                          <AvatarImage
                            src={tp.avatarUrl ?? undefined}
                            className="object-cover"
                          />
                          <AvatarFallback className="rounded-xl text-base font-bold">
                            {tp.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {tp.verified && (
                          <div className="absolute -bottom-1.5 -right-1.5 bg-accent text-accent-foreground rounded-full p-0.5 shadow">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-base leading-tight truncate group-hover:text-primary transition-colors">
                          {tp.name}
                        </p>
                        {tp.username && (
                          <p className="text-xs text-muted-foreground truncate">
                            @{tp.username}
                          </p>
                        )}
                        {tp.companyName && (
                          <p className="text-sm text-muted-foreground truncate mt-0.5">
                            {tp.companyName}
                          </p>
                        )}
                        {tp.trade && (
                          <p className="text-xs text-primary font-medium mt-0.5 truncate">
                            {tp.trade}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating + location row */}
                    <div className="flex items-center gap-3 flex-wrap text-sm">
                      {tp.reviewCount > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-star text-star" />
                          <span className="font-semibold">
                            {tp.avgRating.toFixed(1)}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            ({tp.reviewCount})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No reviews yet
                        </span>
                      )}
                      {tp.postcode && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <MapPin className="h-3 w-3" />
                          {tp.postcode}
                        </div>
                      )}
                    </div>

                    {/* Guarantee badge */}
                    {tp.guarantee && (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
                        <Shield className="h-3.5 w-3.5" />
                        Workmanship guarantee
                      </div>
                    )}

                    {/* Services */}
                    {tp.services.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {tp.services.slice(0, 3).map((svc) => (
                          <Badge
                            key={svc}
                            variant="secondary"
                            className="text-xs"
                          >
                            {svc}
                          </Badge>
                        ))}
                        {tp.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{tp.services.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
