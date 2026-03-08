import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  CheckCircle,
  Shield,
  Clock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const tradespeople = [
  {
    id: 1,
    name: "James Wilson",
    company: "Wilson Building Services",
    trade: "Builder",
    location: "London, E1",
    distance: "2.3 miles",
    rating: 4.9,
    reviews: 128,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated", "Responds Fast"],
    completedJobs: 234,
    hourlyRate: "£45-65",
    description:
      "Professional builder with over 15 years experience in extensions, renovations, and new builds.",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    company: "ST Plumbing & Heating",
    trade: "Plumber",
    location: "London, SE1",
    distance: "3.1 miles",
    rating: 4.8,
    reviews: 96,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated"],
    completedJobs: 189,
    hourlyRate: "£50-70",
    description:
      "Gas Safe registered plumber specializing in boiler installations, repairs, and bathroom plumbing.",
  },
  {
    id: 3,
    name: "Mike Davies",
    company: "Davies Electrical",
    trade: "Electrician",
    location: "London, N1",
    distance: "1.8 miles",
    rating: 5.0,
    reviews: 74,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated", "Responds Fast"],
    completedJobs: 156,
    hourlyRate: "£55-75",
    description:
      "NICEIC approved electrician. Full and partial rewires, consumer units, EV charger installations.",
  },
  {
    id: 4,
    name: "Emma Roberts",
    company: "Roberts Decorating",
    trade: "Painter & Decorator",
    location: "London, W1",
    distance: "4.2 miles",
    rating: 4.9,
    reviews: 112,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    badges: ["Responds Fast"],
    completedJobs: 203,
    hourlyRate: "£35-50",
    description:
      "Professional painter and decorator with a keen eye for detail. Interior and exterior work.",
  },
  {
    id: 5,
    name: "Tom Harrison",
    company: "Harrison Roofing",
    trade: "Roofer",
    location: "London, SW1",
    distance: "5.6 miles",
    rating: 4.7,
    reviews: 89,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    badges: [],
    completedJobs: 145,
    hourlyRate: "£40-60",
    description:
      "All aspects of roofing undertaken. Flat roofs, pitched roofs, lead work, and repairs.",
  },
  {
    id: 6,
    name: "Lisa Chen",
    company: "Chen Carpentry",
    trade: "Carpenter",
    location: "London, EC1",
    distance: "2.9 miles",
    rating: 4.8,
    reviews: 67,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated"],
    completedJobs: 98,
    hourlyRate: "£45-65",
    description:
      "Bespoke carpentry and joinery. Fitted furniture, kitchens, and restoration work.",
  },
];

const categories = [
  "All Trades",
  "Builders",
  "Plumbers",
  "Electricians",
  "Roofers",
  "Painters",
  "Carpenters",
  "Landscapers",
];

const FilterSidebar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Rating Filter */}
        <div>
          <h4 className="font-semibold mb-3">Rating</h4>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-star text-star" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    & up
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Verification Filter */}
        <div>
          <h4 className="font-semibold mb-3">Verification</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">ID Verified</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">Insurance Verified</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">Background Checked</span>
            </label>
          </div>
        </div>

        {/* Response Time */}
        <div>
          <h4 className="font-semibold mb-3">Response Time</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">Within 1 hour</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">Within 24 hours</span>
            </label>
          </div>
        </div>

        {/* Distance */}
        <div>
          <h4 className="font-semibold mb-3">Distance</h4>
          <Select defaultValue="10">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Within 5 miles</SelectItem>
              <SelectItem value="10">Within 10 miles</SelectItem>
              <SelectItem value="25">Within 25 miles</SelectItem>
              <SelectItem value="50">Within 50 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const Tradespeople = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  return (
    <main className="flex-1">
      {/* Search Header */}
      <section className="bg-primary py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="What do you need done?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg border-0 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Postcode or town"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg border-0 focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>
            <Button size="lg">Search</Button>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b bg-white py-4 sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground
                    first:bg-primary first:text-primary-foreground"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-40 bg-card rounded-xl border p-6">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Tradespeople near you</h1>
                  <p className="text-muted-foreground">
                    {tradespeople.length} professionals found
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="distance">Nearest</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden md:flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Grid/List */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 gap-6"
                    : "space-y-4"
                }
              >
                {tradespeople.map((person) => (
                  <Link
                    key={person.id}
                    to={`/tradespeople/${person.id}`}
                    className={`bg-card rounded-xl border shadow-card card-hover overflow-hidden ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Card Content */}
                    <div className={viewMode === "list" ? "flex flex-1" : ""}>
                      {/* Avatar Section */}
                      <div
                        className={
                          viewMode === "list"
                            ? "p-4 flex items-center"
                            : "p-4 flex items-start gap-4"
                        }
                      >
                        <div className="relative shrink-0">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          {person.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground rounded-full p-0.5">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        {viewMode === "grid" && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-lg truncate">
                                  {person.name}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {person.company}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-primary mt-1">
                              {person.trade}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Info Section */}
                      <div
                        className={
                          viewMode === "list" ? "flex-1 py-4 pr-4" : "px-4 pb-4"
                        }
                      >
                        {viewMode === "list" && (
                          <div className="mb-2">
                            <h3 className="font-semibold text-lg">
                              {person.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {person.company}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              {person.trade}
                            </p>
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {person.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-star text-star" />
                            <span className="font-semibold">
                              {person.rating}
                            </span>
                            <span className="text-muted-foreground">
                              ({person.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {person.distance}
                          </div>
                          <div className="text-muted-foreground">
                            {person.completedJobs} jobs
                          </div>
                        </div>

                        {/* Badges */}
                        {person.badges.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {person.badges.map((badge) => (
                              <Badge
                                key={badge}
                                variant="secondary"
                                className="text-xs"
                              >
                                {badge === "Responds Fast" && (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {badge === "Top Rated" && (
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                )}
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div
                        className={
                          viewMode === "list"
                            ? "p-4 flex items-center border-l"
                            : "px-4 pb-4 pt-0"
                        }
                      >
                        <Button className={viewMode === "list" ? "" : "w-full"}>
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-10">
                <Button variant="outline" size="lg">
                  Load More Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tradespeople;
