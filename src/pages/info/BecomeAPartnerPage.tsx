import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import TradespersonCTASection from "@/components/tradesnetwork/CTASection";
import {
  CheckList,
  Eyebrow,
  PageHero,
  Prose,
  Section,
} from "@/components/shared/ContentBlocks";

// No partner enquiry form exists yet; enquiries go to the address used in the Terms.
const PARTNER_EMAIL =
  "mailto:info@thebuildernetwork.com?subject=Partnership%20enquiry";

const BecomeAPartner = () => {
  return (
    <>
      <Helmet>
        <title>Become a Partner | The Builder Network</title>
        <meta
          name="description"
          content="Partner with The Builder Network — collaborations for retailers, e-commerce businesses, contractors and trade businesses in the property improvement sector."
        />
      </Helmet>

      <PageHero
        eyebrow="Partner With The Builder Network"
        title="New Opportunities Start with Better Connections"
      >
        <p>
          The Builder Network brings together homeowners, trade professionals
          and businesses involved in property improvement.
        </p>
        <p>
          We welcome partnership enquiries from retailers, service providers,
          contracting businesses and organisations looking to connect customers
          with relevant trade expertise.
        </p>
        <p>
          Our approach is built around practical collaborations that add value
          for customers and create opportunities for participating businesses.
        </p>
      </PageHero>

      <Section
        eyebrow="Partnerships for Retailers and E-commerce Businesses"
        title="Make the Customer Journey Easier, Beyond the Purchase"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <Prose>
            <p>
              Customers purchasing products for their homes may also need
              professional help with installation, assembly or fitting.
            </p>
            <p>
              The Builder Network can provide a route for those customers to
              find tradespeople offering the services they need.
            </p>
            <p>
              Whether your business sells kitchens, bathrooms, flooring, doors
              or home improvement products, a trade-service partnership could
              help you offer a more complete customer journey.
            </p>
          </Prose>
          <div className="rounded-xl border bg-card p-6 shadow-card md:p-8">
            <h3 className="text-lg font-semibold text-foreground">
              Potential Partnership Benefits
            </h3>
            <CheckList
              className="mt-5"
              items={[
                "Give customers a convenient path to finding installation professionals.",
                "Complement your products with access to relevant trade services.",
                "Create a more connected shopping and home improvement experience.",
                "Explore integration options suited to your business.",
                "Support customers who need specialist assistance after purchasing.",
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-xl bg-primary/[0.04] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <h3 className="font-semibold text-foreground">
              Explore a Retail Partnership
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Tell us about your business and the services your customers
              regularly require. Our team can discuss potential opportunities
              for collaboration.
            </p>
          </div>
          <Button asChild size="xl" className="shrink-0">
            <a href={PARTNER_EMAIL}>Explore Partnership Opportunities</a>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Partnerships for Contractors and Trade Businesses"
        title="Build New Connections for Your Growing Business"
        tinted
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <Prose>
            <p>
              Running a busy trade business involves more than completing
              projects. You also need to find suitable opportunities, manage
              enquiries and maintain a consistent workflow.
            </p>
            <p>
              The Builder Network is designed to help contractors discover
              homeowners looking for relevant services.
            </p>
            <p>
              Whether you manage an established team or are expanding your
              coverage area, joining our professional network could introduce
              your business to new project enquiries.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-2">
              <Link to="/tradesnetwork">Join as a tradesperson</Link>
            </Button>
          </Prose>
          <div className="rounded-xl border bg-card p-6 shadow-card md:p-8">
            <h3 className="text-lg font-semibold text-foreground">
              Why Work With Us?
            </h3>
            <CheckList
              className="mt-5"
              items={[
                "Discover enquiries connected to your trade.",
                "Explore opportunities within your preferred service areas.",
                "Present your business and specialist capabilities.",
                "Build visibility among homeowners planning projects.",
                "Develop your business through new customer relationships.",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Eyebrow>Designed for Different Types of Partners</Eyebrow>
          <p className="leading-relaxed text-muted-foreground">
            We welcome enquiries from independent trade businesses, regional
            contractors, home improvement retailers, installation providers and
            organisations serving the property sector.
          </p>
        </div>
      </Section>

      <TradespersonCTASection
        title="Let's Build Something Better Together"
        description="Interested in working with The Builder Network? Share a few details about your organisation, your goals and the type of partnership you're exploring. Connect with our team to discuss business opportunities."
        ctaText="Become a Partner"
        to={PARTNER_EMAIL}
      />
    </>
  );
};

export default BecomeAPartner;
