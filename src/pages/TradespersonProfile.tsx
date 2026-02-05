import { useState } from "react";
import { useParams } from "react-router-dom";
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
  Heart,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for the tradesperson
const tradesperson = {
  id: 1,
  name: "James Wilson",
  company: "Wilson Building Services",
  trade: "Builder",
  location: "London, E1",
  postcode: "E1 6AN",
  rating: 4.9,
  reviewCount: 128,
  verified: true,
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  coverImage:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=400&fit=crop",
  badges: ["Top Rated", "Responds Fast", "5+ Years"],
  completedJobs: 234,
  hourlyRate: "£45-65",
  memberSince: "January 2019",
  lastActive: "2 hours ago",
  responseTime: "Usually responds within 2 hours",
  bio: `Professional builder with over 15 years of experience in residential and commercial construction. I specialize in extensions, renovations, loft conversions, and new builds.

My team and I take pride in delivering high-quality work on time and within budget. We are fully insured and all our work is guaranteed. From initial consultation to project completion, I work closely with my clients to ensure their vision becomes reality.

I hold all relevant certifications and am a member of the Federation of Master Builders.`,
  services: [
    "House Extensions",
    "Loft Conversions",
    "Kitchen Fitting",
    "Bathroom Installation",
    "Brickwork",
    "Plastering",
    "Roofing",
    "General Renovations",
  ],
  qualifications: [
    { name: "City & Guilds Level 3 Construction", verified: true },
    { name: "CSCS Gold Card", verified: true },
    { name: "Federation of Master Builders Member", verified: true },
    { name: "NHBC Registered", verified: true },
  ],
  insurance: {
    publicLiability: "£5,000,000",
    employersLiability: "£10,000,000",
    professionalIndemnity: "£1,000,000",
    verified: true,
    expiresAt: "December 2025",
  },
  portfolio: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      title: "Kitchen Extension - Hackney",
      category: "Extensions",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop",
      title: "Loft Conversion - Islington",
      category: "Loft Conversions",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      title: "Full House Renovation",
      category: "Renovations",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=400&fit=crop",
      title: "New Build Project",
      category: "New Builds",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop",
      title: "Bathroom Remodel",
      category: "Bathrooms",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop",
      title: "Garden Room Extension",
      category: "Extensions",
    },
  ],
  ratingBreakdown: {
    5: 95,
    4: 22,
    3: 8,
    2: 2,
    1: 1,
  },
  reviewsList: [
    {
      id: 1,
      author: "Jennifer M.",
      rating: 5,
      date: "2 weeks ago",
      project: "Kitchen Extension",
      text: "James and his team did an absolutely fantastic job on our kitchen extension. From the initial consultation to the final clean-up, everything was handled professionally. The work was completed on time and within budget. Couldn't be happier with the results!",
      helpful: 12,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      author: "David C.",
      rating: 5,
      date: "1 month ago",
      project: "Loft Conversion",
      text: "Excellent work on our loft conversion. James was very knowledgeable and helped us navigate the planning process smoothly. His team was punctual, tidy, and respectful of our home. The finished loft is beyond our expectations.",
      helpful: 8,
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      author: "Sarah W.",
      rating: 4,
      date: "2 months ago",
      project: "Bathroom Installation",
      text: "Great job overall on our bathroom. Minor delays due to supply chain issues but James kept us informed throughout. The quality of work is excellent and we're very happy with the final result.",
      helpful: 5,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    },
  ],
};

const TradespersonProfile = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const totalRatings = Object.values(tradesperson.ratingBreakdown).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary to-primary/80">
          <img
            src={tradesperson.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="container relative -mt-20 pb-8">
          <div className="bg-card rounded-xl border shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative mx-auto md:mx-0 -mt-24 md:-mt-16">
                <img
                  src={tradesperson.avatar}
                  alt={tradesperson.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-card shadow-xl"
                />
                {tradesperson.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2 shadow-lg verified-glow">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {tradesperson.name}
                  </h1>
                </div>
                <p className="text-muted-foreground mb-1">
                  {tradesperson.company}
                </p>
                <p className="text-primary font-medium mb-4">
                  {tradesperson.trade}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-star text-star" />
                    <span className="font-semibold">{tradesperson.rating}</span>
                    <span className="text-muted-foreground">
                      ({tradesperson.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tradesperson.location}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {tradesperson.completedJobs} jobs completed
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {tradesperson.badges.map((badge) => (
                    <Badge key={badge} className="trust-badge-verified">
                      {badge === "Top Rated" && (
                        <Star className="h-3 w-3 mr-1 fill-current" />
                      )}
                      {badge === "Responds Fast" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {badge === "5+ Years" && (
                        <Award className="h-3 w-3 mr-1" />
                      )}
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 md:items-end shrink-0">
                <Button size="lg" className="w-full md:w-auto">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Get a Quote
                </Button>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center md:text-right">
                  <Clock className="h-3.5 w-3.5 inline mr-1" />
                  {tradesperson.responseTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
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
                  {/* Bio */}
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {tradesperson.bio}
                    </p>
                  </div>

                  {/* Services */}
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Services Offered
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {tradesperson.services.map((service) => (
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

                  {/* Qualifications */}
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Qualifications & Accreditations
                    </h2>
                    <div className="space-y-3">
                      {tradesperson.qualifications.map((qual) => (
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
                </TabsContent>

                {/* Portfolio Tab */}
                <TabsContent value="portfolio" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tradesperson.portfolio.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedImage(index)}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                            <p className="font-medium text-sm truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-white/80">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  {/* Rating Summary */}
                  <div className="bg-card rounded-xl border p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Overall Rating */}
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                          {tradesperson.rating}
                        </div>
                        <div className="flex justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.round(tradesperson.rating) ? "fill-star text-star" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tradesperson.reviewCount} reviews
                        </p>
                      </div>

                      {/* Rating Breakdown */}
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm w-3">{star}</span>
                            <Star className="h-4 w-4 fill-star text-star" />
                            <Progress
                              value={
                                (tradesperson.ratingBreakdown[
                                  star as keyof typeof tradesperson.ratingBreakdown
                                ] /
                                  totalRatings) *
                                100
                              }
                              className="h-2 flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-8">
                              {
                                tradesperson.ratingBreakdown[
                                  star as keyof typeof tradesperson.ratingBreakdown
                                ]
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {tradesperson.reviewsList.map((review) => (
                      <div
                        key={review.id}
                        className="bg-card rounded-xl border p-6"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar}
                            alt={review.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-semibold">
                                  {review.author}
                                </span>
                                <span className="text-muted-foreground text-sm ml-2">
                                  {review.date}
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
                            <Badge variant="secondary" className="mb-3">
                              {review.project}
                            </Badge>
                            <p className="text-muted-foreground leading-relaxed">
                              {review.text}
                            </p>
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
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
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {tradesperson.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">
                        {tradesperson.memberSince}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Active</p>
                      <p className="text-sm text-muted-foreground">
                        {tradesperson.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Card */}
              <div className="bg-card rounded-xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Insurance</h3>
                  {tradesperson.insurance.verified && (
                    <Badge className="trust-badge-verified ml-auto">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Public Liability
                    </span>
                    <span className="font-medium">
                      {tradesperson.insurance.publicLiability}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Employers Liability
                    </span>
                    <span className="font-medium">
                      {tradesperson.insurance.employersLiability}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Professional Indemnity
                    </span>
                    <span className="font-medium">
                      {tradesperson.insurance.professionalIndemnity}
                    </span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-muted-foreground">
                      Valid until {tradesperson.insurance.expiresAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TradespersonProfile;
