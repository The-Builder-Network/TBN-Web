import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import TradespersonCTASection from "@/components/tradesnetwork/CTASection";
import { PageHero, Prose, Section } from "@/components/shared/ContentBlocks";

const CONTACT_EMAIL =
  "mailto:info@thebuildernetwork.com?subject=Professional%20standards%20enquiry";

interface Standard {
  label: string;
  title: string;
  body: string[];
  list?: string[];
}

const standards: Standard[] = [
  {
    label: "Put Respect First",
    title: "Treat Every Customer Professionally",
    body: [
      "A successful working relationship begins with respect.",
      "Tradespeople should communicate politely, respect customer property and maintain appropriate professional boundaries.",
      "We expect professionals to:",
    ],
    list: [
      "Treat customers fairly and courteously.",
      "Respect agreed access arrangements.",
      "Take reasonable care of the property.",
      "Manage the work area responsibly.",
      "Avoid threatening, discriminatory or abusive behaviour.",
    ],
  },
  {
    label: "Be Reliable and Accountable",
    title: "Follow Through on Your Commitments",
    body: [
      "Customers organise their time and budgets around agreed appointments.",
      "Tradespeople should make realistic commitments and keep customers informed if circumstances change.",
      "This includes arriving at agreed times, providing updates where necessary and communicating promptly about delays.",
    ],
  },
  {
    label: "Make Pricing Easy to Understand",
    title: "Clear Quotations Build Better Relationships",
    body: [
      "Customers should understand what they are agreeing to before work begins.",
      "Written quotations should explain the proposed services, expected charges, relevant taxes and any important exclusions.",
      "If unforeseen work or additional costs arise, discuss these with the customer before proceeding.",
    ],
  },
  {
    label: "Communicate Throughout the Project",
    title: "Keep Customers Informed",
    body: [
      "Home improvement projects often involve questions, adjustments and decisions.",
      "Good communication can prevent avoidable misunderstandings.",
      "We encourage tradespeople to explain technical matters in accessible language, respond to reasonable customer questions and provide updates on significant developments.",
    ],
  },
  {
    label: "Work Within Your Expertise",
    title: "Accept Projects You Are Qualified to Deliver",
    body: [
      "Trade professionals should only undertake work for which they possess the appropriate knowledge, experience, qualifications and legal permissions.",
      "Where specialist authorisation is required, professionals must comply with the relevant UK regulations.",
      "Work outside your capabilities should be referred to a suitable specialist.",
    ],
  },
  {
    label: "Prioritise Safety and Workmanship",
    title: "Protect People, Property and the Quality of Your Work",
    body: [
      "Professional workmanship requires appropriate planning, suitable materials and responsible working methods.",
      "Tradespeople must follow applicable health and safety requirements, building regulations and other legal obligations relevant to the work.",
      "Concerns affecting safety or the integrity of the project should be addressed promptly.",
    ],
  },
  {
    label: "Be Honest About Your Business",
    title: "Keep Your Professional Information Accurate",
    body: [
      "Trade professionals must represent their business and experience truthfully.",
      "Profiles, portfolio images, qualifications and service descriptions should not create misleading impressions.",
      "Important changes to business details or professional credentials should be reflected in the relevant account information.",
    ],
  },
  {
    label: "Handle Complaints Constructively",
    title: "Work Towards Fair Solutions",
    body: [
      "Disagreements can sometimes occur even when both parties have good intentions.",
      "We expect tradespeople to respond to reasonable concerns professionally, consider relevant evidence and make genuine efforts to resolve problems.",
      "Threats, harassment or attempts to pressure customers into withdrawing legitimate complaints are unacceptable.",
    ],
  },
  {
    label: "Protect Customer Information",
    title: "Respect Privacy and Confidentiality",
    body: [
      "Customer contact details, addresses, project information and other personal data must be handled responsibly.",
      "Information obtained through the platform should only be used for legitimate and authorised purposes, in accordance with applicable privacy laws.",
    ],
  },
  {
    label: "Follow Platform Rules",
    title: "Help Maintain a Responsible Professional Community",
    body: [
      "Tradespeople using The Builder Network must comply with the platform's applicable terms, professional requirements and published policies.",
      "Serious or repeated concerns may lead to a review of account access, subject to the platform's established procedures.",
    ],
  },
];

const QualityRequirements = () => {
  return (
    <>
      <Helmet>
        <title>Professional Standards | The Builder Network</title>
        <meta
          name="description"
          content="The Builder Network professional standards: the conduct we expect from tradespeople on respect, reliability, pricing, communication, safety and privacy."
        />
      </Helmet>
      <main className="flex-1">
        <PageHero
          eyebrow="The Builder Network Professional Standards"
          title="Good Work Starts with Professional Responsibility"
        >
          <p>
            The Builder Network aims to create a positive environment for
            homeowners and trade professionals.
          </p>
          <p>
            To support that goal, we expect participating tradespeople to
            demonstrate responsible business practices, clear communication and
            respect for customers.
          </p>
          <p>
            These standards outline the conduct expected from professionals
            using our platform.
          </p>
        </PageHero>

        <div className="container py-14 md:py-20">
          <ol className="grid gap-5 lg:grid-cols-2">
            {standards.map(({ label, title, body, list }, i) => (
              <li
                key={label}
                className="rounded-xl border bg-card p-6 shadow-card md:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {i + 1}. {label}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground md:text-xl">
                  {title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {list && (
                    <ul className="list-disc space-y-1 pl-5 marker:text-primary">
                      {list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Section eyebrow="Our Shared Commitment" title="A stronger trade community" tinted>
          <Prose>
            <p>
              The Builder Network exists to help create productive connections
              between homeowners and skilled professionals.
            </p>
            <p>
              By following clear professional standards, tradespeople contribute
              to a better experience for customers and a stronger reputation for
              the wider trade community.
            </p>
          </Prose>
          <div className="mt-10 flex max-w-3xl flex-col gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <h2 className="font-semibold text-foreground">
                Questions About Our Standards?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Contact The Builder Network for guidance on professional
                expectations, platform policies or account-related concerns.
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="shrink-0">
              <a href={CONTACT_EMAIL}>Contact Our Team</a>
            </Button>
          </div>
        </Section>
      </main>
      <TradespersonCTASection
        title="Grow Your Business with The Builder Network"
        description="Connect with homeowners looking for professional help and showcase the services your business provides. Introduce your business and explore opportunities within our professional network."
        ctaText="Join as a Tradesperson"
        to="/tradesnetwork"
      />
    </>
  );
};

export default QualityRequirements;
