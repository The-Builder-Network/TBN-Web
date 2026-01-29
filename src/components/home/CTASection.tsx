import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 p-12 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Content */}
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to start your project?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Post your job for free and get quotes from trusted local tradespeople within hours.
              </p>

              {/* Trust Points */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                {[
                  { icon: Shield, text: "Money-back guarantee" },
                  { icon: Clock, text: "Quotes in hours" },
                  { icon: ThumbsUp, text: "100% free to use" },
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/90">
                    <point.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{point.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/post-job">
                <Button variant="hero" size="xl" className="cta-pulse">
                  Post a Job Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white max-w-sm w-full">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">2M+</div>
                <div className="text-white/70">Jobs completed</div>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-white/70">Tradespeople</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-sm text-white/70">Avg. Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
