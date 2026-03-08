import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatsSection from "@/components/home/sections/StatsSection";
import CTASection from "@/components/home/sections/CTASection";

const About = () => {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          About us
        </h1>
      </section>

      {/* Mission Section */}
      <section className="pt-6 pb-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Our mission</h2>
          <h3 className="text-xl font-semibold mb-6">
            We help homeowners choose great builders, and we help great builders
            succeed
          </h3>

          <div className="space-y-6 text-muted-foreground">
            <p>
              There are plenty of tradespeople out there, but finding a good one
              is like looking for a needle in a haystack. At The Builder
              Network, we take the hassle out of finding the right tradesperson
              with our unique matchmaking system. Once your job is posted, we
              alert relevant tradespeople and those interested get in touch. You
              see full work history and customer feedback comments, helping you
              choose the best builder for your job.
            </p>

            <blockquote className="border-l-4 border-highlight pl-4 italic my-8">
              "It is difficult getting a builder and more difficult getting a
              builder you like. The Builder Network helps with that process."
            </blockquote>

            <p className="font-semibold text-foreground">Geoff Cooper</p>
            <p className="text-sm">Former CEO, Travis Perkins Group</p>

            <p className="mt-8">
              And if you think life is any easier for builders looking for work,
              think again. Finding clients can seem like an impossible task and
              traditional advertising and directories almost never work. The
              trades need to focus on doing great work for their customers,
              without having to worry about where the next job will come from.
              The Builder Network's feedback system means that today's client
              helps future tradespeople with tomorrow's work.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">History</h2>

          <div className="space-y-6 text-muted-foreground">
            <p>
              Ryan Netz, a stonemason and roofer working in Bristol, dreamed of
              a better way to find work back in 2004 by giving consumers a way
              to find local, reliable builders. He immediately began to make his
              dream come true by setting up an office in his garage. After two
              years, a few false starts and a bit of late nights, The Builder
              Network was launched.
            </p>

            <p>
              Since then, we've helped hundreds of thousands of homeowners
              choose the right builder for their project, and we've ensured that
              thousands of tradespeople all over the country have a steady
              stream of work.
            </p>

            <p>
              Inspired by Ryan's vision, we're still working hard to make sure
              The Builder Network is the single best way for homeowners to
              choose great builders and for great builders to succeed.
            </p>
          </div>
        </div>
      </section>
      <div className="py-12">
        <StatsSection />
      </div>

      <CTASection title="Find the right tradesperson for your project today" />
    </main>
  );
};

export default About;
