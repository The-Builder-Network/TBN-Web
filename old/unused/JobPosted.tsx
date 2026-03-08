import { Link } from "react-router-dom";
import { CheckCircle, Clock, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobPosted = () => {
  return (
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container max-w-lg text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-4">Your job has been posted!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We're matching you with trusted tradespeople in your area. You'll start receiving quotes soon.
          </p>

          {/* What's Next */}
          <div className="bg-card rounded-xl border p-6 mb-8 text-left">
            <h2 className="font-semibold text-lg mb-4">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Get notified</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll email you when tradespeople respond to your job
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Compare quotes</h3>
                  <p className="text-sm text-muted-foreground">
                    Review profiles, read reviews, and compare prices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Hire with confidence</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose the best tradesperson for your project
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link to="/my-jobs">
              <Button size="lg" className="w-full">
                View My Jobs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
  );
};

export default JobPosted;
