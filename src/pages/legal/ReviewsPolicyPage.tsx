import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/home/sections/CTASection";
import { PageHero } from "@/components/shared/ContentBlocks";

// TODO: set once the policy date is approved; the line is hidden until then.
const POLICY_EFFECTIVE_DATE: string | null = null;

const SUPPORT_EMAIL = "mailto:info@thebuildernetwork.com?subject=Reviews%20enquiry";

interface PolicySection {
  title: string;
  body: string[];
  list?: string[];
  after?: string[];
}

const sections: PolicySection[] = [
  {
    title: "Who Can Submit a Review?",
    body: [
      "Customer reviews should come from individuals with genuine, first-hand experience of the tradesperson or service being reviewed.",
      "Feedback should relate to a real job, interaction or service engagement and should accurately describe the reviewer's own experience.",
      "Reviews must not be submitted on behalf of someone else or in an attempt to misrepresent a business's performance.",
      "Eligibility to publish a review may also depend on the account and project information available on the platform.",
    ],
  },
  {
    title: "Writing a Helpful Review",
    body: [
      "The most useful feedback explains what happened and gives other homeowners meaningful information.",
      "When sharing your experience, consider commenting on:",
    ],
    list: [
      "The type of work arranged or completed.",
      "Communication and responsiveness.",
      "Punctuality and reliability.",
      "The standard of the finished work.",
      "How changes or concerns were handled.",
      "Your overall experience with the professional.",
    ],
    after: ["Aim for clear, balanced and factual language."],
  },
  {
    title: "Reviews Must Be Authentic",
    body: [
      "Reviews should reflect real customer experiences.",
      "The following practices are not permitted:",
    ],
    list: [
      "Submitting reviews about work or experiences that did not occur.",
      "Impersonating customers or other individuals.",
      "Deliberately manipulating ratings.",
      "Posting reviews to mislead potential customers.",
      "Offering or accepting improper incentives in exchange for specific ratings or feedback.",
      "Coordinating dishonest reviews to artificially improve or damage a reputation.",
    ],
    after: ["Businesses must not pressure customers to leave only positive feedback."],
  },
  {
    title: "Keeping Reviews Respectful",
    body: [
      "We welcome constructive feedback, including criticism, but ask reviewers to communicate responsibly.",
      "Reviews should not contain:",
    ],
    list: [
      "Harassment, threats or abusive statements.",
      "Discriminatory or hateful language.",
      "Unnecessary personal information.",
      "Confidential financial or identification details.",
      "Advertising, unrelated links or spam.",
      "Allegations presented as established facts without a reasonable basis.",
      "Content that infringes another person's legal rights.",
    ],
    after: [
      "A negative experience can be described clearly without using insulting language.",
    ],
  },
  {
    title: "How We Approach Negative Feedback",
    body: [
      "A low rating does not automatically mean that a review is inappropriate.",
      "Where a review represents a genuine experience and complies with the applicable rules, criticism should not be suppressed simply because it is unfavourable.",
      "A tradesperson may disagree with the feedback, but disagreement alone is not grounds for its removal.",
    ],
  },
  {
    title: "Reporting a Review",
    body: [
      "Homeowners and tradespeople may raise concerns about reviews they believe contain inappropriate, misleading or unauthorised material.",
      "A report should identify the review and explain the concern, together with any relevant supporting information.",
      "The Builder Network may assess the report against its published policies and applicable legal obligations.",
    ],
  },
  {
    title: "Review Moderation",
    body: [
      "Reviews may be subject to checks intended to identify spam, misuse, prohibited content or potential manipulation.",
      "Depending on the circumstances and the platform's moderation procedures, action may include:",
    ],
    list: [
      "Requesting clarification or additional information.",
      "Restricting publication while a concern is assessed.",
      "Removing content that breaches applicable rules.",
      "Taking appropriate account-level action in response to repeated misuse.",
    ],
    after: [
      "Moderation decisions should be based on consistent standards rather than whether feedback is positive or negative.",
    ],
  },
  {
    title: "Responding to Customer Reviews",
    body: [
      "Trade professionals are encouraged to respond courteously when feedback is available.",
      "A professional response can acknowledge the customer's experience, offer clarification and explain any constructive steps taken to address a concern.",
      "Responses must not disclose private customer information, contain threats or attempt to intimidate reviewers.",
    ],
  },
  {
    title: "Correcting or Removing Feedback",
    body: [
      "Customers who believe their published feedback contains an error should contact The Builder Network or use any available account features to request a correction.",
      "Requests to remove reviews will be considered in accordance with applicable policies, contractual rights and legal obligations.",
      "A tradesperson cannot require removal solely because a review is critical.",
    ],
  },
  {
    title: "Review Scores and Ratings",
    body: [
      "Where star ratings are displayed, the platform should explain how the overall rating is calculated.",
      "Any use of averages, review counts, imported feedback or other scoring methods should be presented accurately and without misleading customers.",
    ],
  },
  {
    title: "Feedback from Outside the Platform",
    body: [
      "Any review collected outside the normal platform booking process must be clearly identified where necessary and handled through an appropriate authenticity assessment.",
      "External reviews should not be presented as verified platform transactions unless they meet the relevant verification criteria.",
    ],
  },
  {
    title: "Protecting the Review Process",
    body: [
      "Review information may help users assess service quality, but individual experiences can differ.",
      "Homeowners should consider multiple factors when choosing a tradesperson, including qualifications, quotations, experience and suitability.",
      "We aim to support a feedback environment that values authenticity, transparency and fair treatment.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "The Builder Network may update this policy to reflect developments in its services, legal requirements or review-management procedures.",
      "Where material changes are made, the revised policy should be made accessible to platform users.",
    ],
  },
];

const ReviewsPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Reviews Policy | The Builder Network</title>
        <meta
          name="description"
          content="The Builder Network customer reviews policy: who can review, keeping reviews authentic and respectful, reporting, moderation and responses."
        />
      </Helmet>

      <PageHero
        eyebrow="Customer Reviews Policy"
        title="Building Trust Through Genuine Experiences"
      >
        <p>
          The Builder Network values feedback that helps people understand what
          it's like to work with a particular trade professional.
        </p>
        <p>
          Our reviews framework is intended to encourage honest experiences,
          constructive communication and responsible use of customer feedback.
        </p>
        <p>
          This policy explains our expectations for submitting reviews,
          responding to feedback and reporting concerns.
        </p>
      </PageHero>

      <div className="container py-14 md:py-20">
        <ol className="max-w-3xl space-y-12">
          {sections.map(({ title, body, list, after }, i) => (
            <li key={title} className="scroll-mt-24" id={`section-${i + 1}`}>
              <h2 className="flex gap-3 text-xl font-bold text-foreground md:text-2xl">
                <span className="text-primary">{i + 1}.</span>
                {title}
              </h2>
              <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                {body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {list && (
                  <ul className="list-disc space-y-1.5 pl-6 marker:text-primary">
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {after?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        {POLICY_EFFECTIVE_DATE && (
          <p className="mt-12 text-sm text-muted-foreground">
            Policy effective date: {POLICY_EFFECTIVE_DATE}
          </p>
        )}

        <div className="mt-14 flex max-w-3xl flex-col gap-4 rounded-xl bg-primary/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <h2 className="font-semibold text-foreground">
              Share Your Experience
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your experience may help another homeowner make a better-informed
              decision.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/search">Explore Tradespeople</Link>
          </Button>
        </div>
      </div>

      <CTASection
        title="Questions About Reviews?"
        description="For questions, feedback concerns or review-related enquiries, please contact our support team."
        ctaText="Contact Support"
        to={SUPPORT_EMAIL}
      />
    </>
  );
};

export default ReviewsPolicy;
