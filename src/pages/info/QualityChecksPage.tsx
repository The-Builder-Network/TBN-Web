import { Helmet } from "react-helmet-async";
import CTASection from "@/components/home/sections/CTASection";
import {
  CardGrid,
  CheckList,
  PageHero,
  Prose,
  Section,
} from "@/components/shared/ContentBlocks";

const approach = [
  {
    title: "Identity Information",
    description: (
      <>
        <p>
          Reliable professional profiles begin with accurate personal and
          business details.
        </p>
        <p>
          We expect tradespeople to provide truthful identity and contact
          information and to keep their account information up to date.
        </p>
      </>
    ),
  },
  {
    title: "Business Information",
    description: (
      <>
        <p>
          Where applicable, trade businesses should provide accurate details
          about their trading name, business structure and the services they
          offer.
        </p>
        <p>
          Homeowners should be able to understand who they are considering
          hiring.
        </p>
      </>
    ),
  },
  {
    title: "Qualifications & Specialist Registration",
    description: (
      <>
        <p>
          Some types of work require particular training, legal registration or
          professional authorisation.
        </p>
        <p>
          Tradespeople are responsible for holding the qualifications and
          registrations required for the work they undertake.
        </p>
        <p>
          Homeowners should request evidence of relevant credentials before
          commissioning regulated or specialist work.
        </p>
      </>
    ),
  },
  {
    title: "Experience & Capabilities",
    description: (
      <>
        <p>
          A tradesperson's experience should match the type and complexity of
          the project.
        </p>
        <p>
          Professional profiles should accurately describe the services offered,
          relevant expertise and any specialisms.
        </p>
      </>
    ),
  },
  {
    title: "Professional Conduct",
    description: (
      <>
        <p>
          We expect respectful communication, honest representations and
          responsible behaviour from tradespeople using The Builder Network.
        </p>
        <p>
          Concerns brought to our attention may be reviewed under our platform
          policies.
        </p>
      </>
    ),
  },
];

const QualityChecks = () => {
  return (
    <main className="flex-1">
      <Helmet>
        <title>Quality Checks | The Builder Network</title>
        <meta
          name="description"
          content="How The Builder Network approaches professional information and verification, plus a hiring checklist to help homeowners make informed choices."
        />
      </Helmet>

      <PageHero
        eyebrow="Quality Checks & Professional Verification"
        title="Helping Homeowners Make More Informed Choices"
      >
        <p>
          At The Builder Network, we believe that useful information and
          responsible platform practices play an important role in helping
          homeowners choose a trade professional.
        </p>
        <p>
          Our goal is to promote transparency, encourage professional conduct
          and support informed decision-making throughout the hiring process.
        </p>
      </PageHero>

      <Section
        eyebrow="Our Approach to Professional Information"
        title="What we expect from tradespeople"
      >
        <CardGrid items={approach} numbered className="lg:grid-cols-3" />
      </Section>

      <Section
        eyebrow="Your Own Hiring Checklist"
        title="Before agreeing to work with a tradesperson, consider:"
        tinted
      >
        <div className="max-w-3xl rounded-xl border bg-card p-6 shadow-card md:p-8">
          <CheckList
            items={[
              "Checking their experience with similar projects.",
              "Asking about relevant qualifications and legal registrations.",
              "Requesting a clear written quotation.",
              "Confirming suitable insurance where necessary.",
              "Discussing the expected schedule and payment arrangements.",
              "Clarifying who will supply materials and manage waste.",
              "Checking available customer feedback.",
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="Our Commitment to Transparency" title="Checks work best together">
        <Prose>
          <p>
            No online marketplace can guarantee the outcome of every project. We
            encourage homeowners to carry out their own checks, ask questions
            and agree on important details in writing before work begins.
          </p>
        </Prose>
      </Section>

      <CTASection
        title="Build with Greater Confidence"
        description="Explore relevant trade professionals and choose someone whose skills, experience and approach fit your requirements."
        ctaText="Find a Professional"
        to="/search"
      />
    </main>
  );
};

export default QualityChecks;
