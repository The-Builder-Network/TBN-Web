import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/home/sections/CTASection";
import { CardGrid, PageHero, Section } from "@/components/shared/ContentBlocks";

const steps = [
  {
    title: "Tell Us About Your Project",
    description: (
      <>
        <p>
          Start by selecting the type of work you need and sharing the
          important details.
        </p>
        <p>
          Whether it's an urgent repair, planned renovation or larger building
          project, a clear description helps tradespeople understand your
          requirements.
        </p>
        <p>Include your location, preferred timing and any useful photographs.</p>
      </>
    ),
  },
  {
    title: "Explore Interested Professionals",
    description: (
      <>
        <p>
          Your project information helps connect your enquiry with tradespeople
          offering relevant services.
        </p>
        <p>
          You can explore the professionals who respond, learn about their
          experience and consider which may be the right fit.
        </p>
      </>
    ),
  },
  {
    title: "Discuss the Work and Make Your Choice",
    description: (
      <>
        <p>
          Speak with professionals about the scope of work, expected costs,
          availability and your priorities.
        </p>
        <p>
          Review the information provided and decide who you would like to work
          with. The final hiring decision remains yours.
        </p>
      </>
    ),
  },
];

const reasons = [
  {
    title: "Find Services Relevant to Your Project",
    description:
      "Explore a wide selection of trades and identify the professionals best suited to your requirements.",
  },
  {
    title: "Compare Your Options",
    description:
      "Consider professional experience, service information and available customer feedback before making a decision.",
  },
  {
    title: "Keep Your Project Organised",
    description:
      "Begin with a clear job description so you can have more focused conversations about your needs.",
  },
  {
    title: "Make Decisions at Your Own Pace",
    description:
      "Discuss details with interested professionals and choose an arrangement that works for you.",
  },
];

const journey = [
  {
    title: "Share the Important Details",
    description:
      "Accurate descriptions make it easier for professionals to understand what the work involves.",
  },
  {
    title: "Discuss Scope and Pricing",
    description:
      "Explain your expectations, request quotations and clarify what is included before agreeing to proceed.",
  },
  {
    title: "Agree on Your Project Plan",
    description:
      "Confirm the work to be completed, materials, estimated timescales, access requirements and payment arrangements.",
  },
  {
    title: "Get Your Project Underway",
    description:
      "Once you've selected a tradesperson and agreed on the details, work can begin according to your arrangements.",
  },
  {
    title: "Share Your Experience",
    description:
      "After the project, use any available feedback features to describe your experience and help other homeowners make informed decisions.",
  },
];

const HowItWorks = () => {
  return (
    <main className="flex-1">
      <Helmet>
        <title>How It Works | The Builder Network</title>
        <meta
          name="description"
          content="How The Builder Network works: tell us about your project, explore interested local professionals, then discuss the work and make your choice."
        />
      </Helmet>

      <PageHero
        eyebrow="How The Builder Network Works"
        title="A Simpler Way to Find Help for Your Home"
      >
        <p>
          Finding a suitable tradesperson should feel straightforward, not
          complicated. The Builder Network helps you move from a project idea
          to a conversation with relevant local professionals.
        </p>
      </PageHero>

      <Section eyebrow="Three Steps to Get Started" title="From idea to conversation">
        <CardGrid items={steps} numbered className="lg:grid-cols-3" />
        <Button asChild size="xl" className="mt-10">
          <Link to="/post-job">Get Started</Link>
        </Button>
      </Section>

      <Section
        eyebrow="Why Homeowners Choose The Builder Network"
        title="Designed around your project"
        tinted
      >
        <CardGrid items={reasons} className="lg:grid-cols-4" />
      </Section>

      <Section
        eyebrow="From Enquiry to Completed Project"
        title="What happens next"
      >
        <ol className="max-w-3xl">
          {journey.map(({ title, description }, i) => (
            <li key={title} className="relative flex gap-5 pb-8 last:pb-0">
              {i < journey.length - 1 && (
                <span
                  className="absolute left-[1.125rem] top-10 h-[calc(100%-2.5rem)] w-px bg-border"
                  aria-hidden
                />
              )}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CTASection
        title="Ready to Move Your Project Forward?"
        description="From the first idea to the finished result, finding the right professional can make a real difference. Tell us what you need and start connecting with local professionals."
        ctaText="Post a Project"
        to="/post-job"
      />
    </main>
  );
};

export default HowItWorks;
