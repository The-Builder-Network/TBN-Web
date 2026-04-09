import {
  FileText,
  MessageCircle,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CTASection from "@/components/home/sections/CTASection";
import { Helmet } from "react-helmet-async";

const HowItWorks = () => {
  return (
    <main className="flex-1">
      <Helmet>
        <title>How It Works — Builder Network</title>
        <meta name="description" content="Learn how Builder Network connects homeowners with verified tradespeople in three simple steps." />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It works
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Posting a job on The Builder Network is simple and free. Just tell
            us what you need, and our clever match-making process will help you
            choose the right person for your job with confidence.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a href="/post-job" className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Post a job
              </h3>
              <p className="text-muted-foreground">
                Post your job in a few simple steps. Once your job is on The
                Builder Network, we'll let you know which tradespeople are
                interested.
              </p>
            </a>

            <a
              href="/tradespeople"
              className="text-center group cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                See who's interested
              </h3>
              <p className="text-muted-foreground">
                After you post a job, our matching system identifies and alerts
                relevant tradespeople, who can then express interest in your
                job.
              </p>
            </a>

            <a href="/post-job" className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Start chats with tradespeople
              </h3>
              <p className="text-muted-foreground">
                Choose from local tradespeople interested in your job. Contact
                details are shared only when you say so.
              </p>
            </a>
          </div>

          <div className="text-center">
            <Link to="/post-job">
              <Button size="lg">Get started</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why The Builder Network is the reliable way
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Get matched with available tradespeople
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our unique system finds the best tradespeople for your job
                    from our extensive network of professionals.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Choose who you want to contact with confidence
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Review profiles, work history, and customer feedback to make
                    an informed decision before contacting anyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Hire with confidence
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    All tradespeople on our platform are verified with coverage
                    checks, helping you choose a builder you can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Details Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">View quotes</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Interested tradespeople will send you a quote. You can review
                them by reading their profiles, work history and reviews.
              </p>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Add pictures to your job post for accurate quotes.</span>
              </div>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden h-64 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
                alt="Reviewing quotes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Review pricing</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                To help you choose a builder within your budget, our
                tradespeople usually provide an estimated cost based on the
                amount of work and materials needed.
              </p>
            </div>
            <div className="md:order-1 bg-muted rounded-lg overflow-hidden h-64 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1554224155-98406894d891?q=80&w=2072&auto=format&fit=crop"
                alt="Reviewing pricing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Check reviews</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Customers like you leave reviews for completed jobs. Check
                reviews to find the best tradesperson.
              </p>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden h-64 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                alt="Checking reviews"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Getting Job Done Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-muted rounded-lg overflow-hidden h-64 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
                alt="Getting the job done"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Getting the job done</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Once you've agreed on terms, pricing and timings, your
                tradesperson will get to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Experience Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Review your experience</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                After your job is complete, you can leave a review based on your
                experience. Our review system ensures that tradespeople are
                rewarded for good work and held accountable for any problems.
              </p>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden h-64 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop"
                alt="Review your experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection title="Ready to hire with confidence?" />
    </main>
  );
};

export default HowItWorks;
