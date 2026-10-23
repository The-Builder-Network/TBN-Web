import { Helmet } from "react-helmet-async";
import StatsSection from "@/components/home/sections/StatsSection";
import CTASection from "@/components/home/sections/CTASection";
import {
  CardGrid,
  PageHero,
  Prose,
  Section,
} from "@/components/shared/ContentBlocks";

const beliefs = [
  {
    title: "Making Home Improvements Easier",
    description:
      "From the first enquiry to the final finishing touches, we aim to simplify the journey of finding and hiring a tradesperson.",
  },
  {
    title: "Helping Skills Get Recognised",
    description:
      "We want experienced professionals to have opportunities to demonstrate their capabilities, showcase their projects and build stronger customer relationships.",
  },
  {
    title: "Creating More Confident Decisions",
    description:
      "Clear information, professional profiles and genuine customer experiences can help homeowners assess their options before hiring.",
  },
  {
    title: "Supporting Local Businesses",
    description:
      "By connecting customers with professionals serving their area, we help independent tradespeople discover new opportunities within their communities.",
  },
];

const About = () => {
  return (
    <main className="flex-1">
      <Helmet>
        <title>About Us | The Builder Network</title>
        <meta
          name="description"
          content="The Builder Network connects homeowners with local trade professionals — a simpler way to explore services, connect with interested tradespeople and make informed hiring decisions."
        />
      </Helmet>

      <PageHero
        eyebrow="About The Builder Network"
        title="Connecting Homeowners with the Right People for the Job"
      >
        <p>
          Every home improvement project deserves the right expertise. At The
          Builder Network, we're building a simpler way for homeowners to
          discover local trade professionals and move forward with their
          projects.
        </p>
        <p>
          Whether you're arranging a small repair, renovating a room or planning
          major building work, our platform helps you explore relevant services,
          connect with interested tradespeople and make informed hiring
          decisions.
        </p>
      </PageHero>

      <Section
        eyebrow="Our Mission"
        title="Better Connections. Better Home Projects."
      >
        <Prose>
          <p>
            Our mission is to bring homeowners and skilled tradespeople together
            through a straightforward and dependable online experience.
          </p>
          <p>
            We believe finding the right professional shouldn't involve endless
            searches, unanswered enquiries or unnecessary uncertainty.
            Homeowners should have a convenient way to explain what they need,
            explore available professionals and decide who is best suited to
            their project.
          </p>
          <p>
            At the same time, hardworking tradespeople deserve meaningful
            opportunities to grow their businesses and connect with customers
            who need their expertise.
          </p>
          <p className="font-semibold text-foreground">
            The Builder Network brings both sides together in one place.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="What We Believe" title="What guides our work" tinted>
        <CardGrid items={beliefs} className="lg:grid-cols-4" />
      </Section>

      <Section
        eyebrow="Our Approach"
        title="Built Around Real Home Improvement Needs"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <Prose>
            <p>
              Every property and every project is different. That's why The
              Builder Network supports a broad selection of home maintenance,
              renovation, repair and construction services.
            </p>
            <p>
              Homeowners can describe their projects, identify suitable trade
              categories and explore professionals who are interested in the
              work.
            </p>
            <p>
              Our goal is to make the process more organised, accessible and
              convenient for everyone involved.
            </p>
          </Prose>
          <div className="rounded-xl border bg-card p-6 shadow-card md:p-8">
            <h3 className="text-xl font-semibold text-foreground">
              Growing a Stronger Trade Community
            </h3>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                We're working towards a platform where homeowners can find the
                support they need and trade businesses can build long-term
                success through their expertise, professionalism and customer
                relationships.
              </p>
              <p>
                From everyday maintenance to ambitious renovations, we believe
                every successful project starts with the right connection.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <StatsSection />
      <div className="pb-14 md:pb-20" />

      <CTASection
        title="Your Project Starts Here"
        description="Have a job that needs professional attention? Tell us what you're planning and take the first step towards finding the right tradesperson. Share your requirements and connect with local trade professionals."
        ctaText="Post Your Project"
        to="/post-job"
      />
    </main>
  );
};

export default About;
