import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, MapPin, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "boneyard-js/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSearchTradespeople } from "@/api/search";
import { services } from "@/constants/services";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [serviceSlug, setServiceSlug] = useState(
    searchParams.get("service") ?? "",
  );
  const [postcode, setPostcode] = useState(searchParams.get("postcode") ?? "");

  // Submitted/active params used in the query
  const [activeQuery, setActiveQuery] = useState(query);
  const [activeService, setActiveService] = useState(serviceSlug);
  const [activePostcode, setActivePostcode] = useState(postcode);

  const { data, isLoading, isFetching } = useSearchTradespeople({
    query: activeQuery || undefined,
    serviceSlug: activeService || undefined,
    postcode: activePostcode || undefined,
  });

  const hasActiveSearch = !!(activeQuery || activeService || activePostcode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
    setActiveService(serviceSlug);
    setActivePostcode(postcode);

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
    setActiveQuery("");
    setActiveService("");
    setActivePostcode("");
    setSearchParams({}, { replace: true });
  };

  const results = data?.data ?? [];
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Find Tradespeople</h1>
        <p className="text-muted-foreground mb-8">
          Search verified tradespeople near you.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          {/* Query */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or trade..."
              className="pl-9 h-11"
            />
          </div>

          {/* Service filter */}
          <Select
            value={serviceSlug}
            onValueChange={(val) => setServiceSlug(val === "_all" ? "" : val)}
          >
            <SelectTrigger className="h-11 sm:w-56">
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

          {/* Postcode */}
          <div className="relative sm:w-44">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Postcode"
              className="pl-9 h-11"
              maxLength={8}
            />
          </div>

          <Button type="submit" className="h-11 px-6">
            Search
          </Button>

          {hasActiveSearch && (
            <Button
              type="button"
              variant="ghost"
              className="h-11"
              onClick={handleClear}
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </form>

        {/* Results */}
        <Skeleton
          name="search-results"
          loading={showSkeleton && hasActiveSearch}
        >
          {!showSkeleton && hasActiveSearch && results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                No tradespeople found matching your criteria
              </h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or broadening your filters.
              </p>
              <Button variant="outline" onClick={handleClear}>
                Clear filters
              </Button>
            </div>
          ) : hasActiveSearch ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {data?.meta.total ?? results.length} result
                {(data?.meta.total ?? results.length) !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((tp) => (
                  <Link
                    key={tp.userId}
                    to={`/tradesperson/${tp.username}`}
                    className="border rounded-lg p-5 hover:border-primary/50 hover:shadow-sm transition-all flex flex-col gap-3"
                  >
                    {/* Header row */}
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 shrink-0">
                        <AvatarImage src={tp.avatarUrl ?? undefined} />
                        <AvatarFallback className="text-sm font-semibold">
                          {tp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-base leading-tight truncate">
                          {tp.name}
                        </p>
                        {tp.companyName && (
                          <p className="text-sm text-muted-foreground truncate">
                            {tp.companyName}
                          </p>
                        )}
                        {tp.postcode && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {tp.postcode}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    {tp.reviewCount > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {tp.avgRating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({tp.reviewCount} review
                          {tp.reviewCount !== 1 ? "s" : ""})
                        </span>
                      </div>
                    )}

                    {/* Bio */}
                    {tp.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tp.bio}
                      </p>
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
                            +{tp.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* Initial state — no search yet */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                Search for tradespeople
              </h2>
              <p className="text-muted-foreground">
                Enter a trade, service, or postcode above to find verified
                tradespeople near you.
              </p>
            </div>
          )}
        </Skeleton>
      </div>
    </>
  );
};

export default SearchPage;
