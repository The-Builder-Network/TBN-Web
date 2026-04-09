import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  CheckCircle,
  Shield,
  Clock,
  Calendar,
  Briefcase,
  Award,
  Share2,
  MessageSquare,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicProfile } from "@/api/users";

// ── Helpers ───────────────────────────────────────────────────

function formatMemberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

// ── Loading skeleton ──────────────────────────────────────────

const ProfileSkeleton = () => (
  <main className="flex-1">
    <div className="h-48 md:h-64 bg-muted" />
    <div className="container relative -mt-20 pb-8">
      <div className="bg-card rounded-xl border shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  </main>
);

// ── Component ─────────────────────────────────────────────────

const TradespersonPublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { data: tp, isLoading, error } = usePublicProfile(username ?? "");
  const [, setSelectedPortfolioIndex] = useState(0);

  if (isLoading) return <ProfileSkeleton />;

  if (error || !tp) {
    return (
      <main className="flex-1 container py-16 max-w-2xl text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Profile not found</h1>
        <p className="text-muted-foreground mb-6">
          This tradesperson profile doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/trades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse tradespeople
          </Link>
        </Button>
      </main>
    );
  }

  const totalRatings = Object.values(tp.ratingBreakdown).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <main className="flex-1">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary to-primary/80">
        {tp.coverImageUrl && (
          <img
            src={tp.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container relative -mt-20 pb-8">
        <div className="bg-card rounded-xl border shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative mx-auto md:mx-0 -mt-24 md:-mt-16">
              {tp.avatarUrl ? (
                <img
                  src={tp.avatarUrl}
                  alt={tp.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-card shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-card shadow-xl bg-muted flex items-center justify-center">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {tp.name.charAt(0)}
                  </span>
                </div>
              )}
              {tp.verified && (
                <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2 shadow-lg verified-glow">
                  <CheckCircle className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{tp.name}</h1>
              </div>
              {tp.companyName && (
                <p className="text-muted-foreground mb-1">{tp.companyName}</p>
              )}
              {tp.trade && (
                <p className="text-primary font-medium mb-4">{tp.trade}</p>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-4">
                {tp.reviewCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-star text-star" />
                    <span className="font-semibold">{tp.avgRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      ({tp.reviewCount} reviews)
                    </span>
                  </div>
                )}
                {tp.postcode && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tp.postcode}
                  </div>
                )}
                {tp.completedJobs > 0 && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {tp.completedJobs} jobs completed
                  </div>
                )}
              </div>

              {/* Badges */}
              {tp.badges.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {tp.badges.map((badge) => (
                    <Badge key={badge} className="trust-badge-verified">
                      {badge === "Top Rated" && (
                        <Star className="h-3 w-3 mr-1 fill-current" />
                      )}
                      {badge === "Responds Fast" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {badge === "Verified" && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {badge === "50+ Jobs" && (
                        <Award className="h-3 w-3 mr-1" />
                      )}
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 md:items-end shrink-0">
              <Button size="lg" className="w-full md:w-auto">
                <MessageSquare className="h-5 w-5 mr-2" />
                Get a Quote
              </Button>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              {tp.responseTime && (
                <p className="text-sm text-muted-foreground text-center md:text-right">
                  <Clock className="h-3.5 w-3.5 inline mr-1" />
                  {tp.responseTime}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <div className="w-full overflow-x-auto pb-2 mb-4 scrollbar-hide">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 inline-flex min-w-full">
                  {["about", "portfolio", "reviews"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 capitalize whitespace-nowrap"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-8">
                {tp.bio && (
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {tp.bio}
                    </p>
                  </div>
                )}

                {tp.services.length > 0 && (
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Services Offered
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {tp.services.map((service) => (
                        <div
                          key={service}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tp.qualifications.length > 0 && (
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Qualifications &amp; Accreditations
                    </h2>
                    <div className="space-y-3">
                      {tp.qualifications.map((qual) => (
                        <div
                          key={qual.name}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              {qual.name}
                            </span>
                          </div>
                          {qual.verified && (
                            <Badge className="trust-badge-verified">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                {tp.portfolioItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-12">
                    No portfolio items yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tp.portfolioItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedPortfolioIndex(index)}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title ?? "Portfolio item"}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                            {item.title && (
                              <p className="font-medium text-sm truncate">
                                {item.title}
                              </p>
                            )}
                            {item.category && (
                              <p className="text-xs text-white/80">
                                {item.category}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                {tp.reviewCount > 0 && (
                  <div className="bg-card rounded-xl border p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                          {tp.avgRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.round(tp.avgRating) ? "fill-star text-star" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tp.reviewCount} reviews
                        </p>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm w-3">{star}</span>
                            <Star className="h-4 w-4 fill-star text-star" />
                            <Progress
                              value={
                                totalRatings > 0
                                  ? ((tp.ratingBreakdown[String(star)] ?? 0) /
                                      totalRatings) *
                                    100
                                  : 0
                              }
                              className="h-2 flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-8">
                              {tp.ratingBreakdown[String(star)] ?? 0}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tp.reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-12">
                    No reviews yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {tp.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-card rounded-xl border p-6"
                      >
                        <div className="flex items-start gap-4">
                          {review.authorAvatar ? (
                            <img
                              src={review.authorAvatar}
                              alt={review.authorName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <span className="text-lg font-bold text-muted-foreground">
                                {review.authorName.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-semibold">
                                  {review.authorName}
                                </span>
                                <span className="text-muted-foreground text-sm ml-2">
                                  {timeAgo(review.createdAt)}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-star text-star" : "fill-muted text-muted"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            {review.jobTitle && (
                              <Badge variant="secondary" className="mb-3">
                                {review.jobTitle}
                              </Badge>
                            )}
                            <p className="text-muted-foreground leading-relaxed">
                              {review.comment}
                            </p>
                            {review.reply && (
                              <div className="mt-4 pt-4 border-t bg-muted/50 rounded-lg p-3">
                                <p className="text-sm font-medium mb-1">
                                  Response from {tp.companyName ?? tp.name}:
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {review.reply.body}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
              <Button className="w-full mb-4">
                <MessageSquare className="h-5 w-5 mr-2" />
                Request a Quote
              </Button>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Free, no obligation quote
              </p>

              <div className="space-y-4 pt-4 border-t">
                {tp.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {tp.location}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {formatMemberSince(tp.memberSince)}
                    </p>
                  </div>
                </div>
                {tp.lastActive && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Active</p>
                      <p className="text-sm text-muted-foreground">
                        {timeAgo(tp.lastActive)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(tp.insurance.publicLiability ||
              tp.insurance.employersLiability ||
              tp.insurance.professionalIndemnity) && (
              <div className="bg-card rounded-xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Insurance</h3>
                  {tp.insurance.verified && (
                    <Badge className="trust-badge-verified ml-auto">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="space-y-3 text-sm">
                  {tp.insurance.publicLiability && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Public Liability
                      </span>
                      <span className="font-medium">
                        {tp.insurance.publicLiability}
                      </span>
                    </div>
                  )}
                  {tp.insurance.employersLiability && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Employers Liability
                      </span>
                      <span className="font-medium">
                        {tp.insurance.employersLiability}
                      </span>
                    </div>
                  )}
                  {tp.insurance.professionalIndemnity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Professional Indemnity
                      </span>
                      <span className="font-medium">
                        {tp.insurance.professionalIndemnity}
                      </span>
                    </div>
                  )}
                  {tp.insurance.expiresAt && (
                    <div className="pt-3 border-t">
                      <p className="text-muted-foreground">
                        Valid until {tp.insurance.expiresAt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TradespersonPublicProfile;
