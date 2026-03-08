import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TradespersonCTASection from "@/components/tradesperson/TradespersonCTA";

const QualityRequirements = () => {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-primary/5 py-16">
          <div className="container">
            <div className="text-center">
              <img
                src="/images/quality-standard-hero.jpg"
                alt="Quality Standard"
                className="w-full rounded-lg mb-8 object-cover h-64"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <h1 className="text-4xl font-bold mb-4">
                The Builder Network Quality Standard
              </h1>
              <p className="text-lg text-muted-foreground">
                Tradespeople who sign up to The Builder Network must adhere to
                our quality standards.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container py-12">
          <div className="bg-primary/5 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">
              The Builder Network House Rules
            </h2>
            <p className="text-lg mb-4">
              The Builder Network community of tradespeople takes pride in their
              work and in their relationships with our customers. We require all
              tradespeople to agree to our House Rules to demonstrate their
              commitment to service and quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Rule 1 */}
            <div className="border-l-4 border-highlight pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">🤝</div>
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Always treat customers with respect
                  </h3>
                  <p className="text-sm mb-4">
                    The Builder Network tradespeople must conduct themselves
                    professionally, both online and in person. You must clean up
                    the site after the job is complete. We value mutual respect
                    and so remind both tradespeople and clients to communicate
                    with each other respectfully. We absolutely do not tolerate
                    any physical or verbal abuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="border-l-4 border-highlight pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">📅</div>
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Always keep to the agreements and appointments you make with
                    customers
                  </h3>
                  <p className="text-sm mb-4">Make sure:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
                    <li>You show up to your appointments on time</li>
                    <li>
                      Your quote matches what you agreed with the customer
                    </li>
                    <li>
                      You complete the work to the agreed schedule and to the
                      best of your ability
                    </li>
                  </ul>
                  <p className="text-sm">
                    We understand that things happen, and sometimes appointments
                    need to change. In these cases, we ask that you get in
                    contact with the customer ahead of time to reschedule.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="border-l-4 border-highlight pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">💬</div>
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Clearly communicate costs and timings
                  </h3>
                  <p className="text-sm mb-4">
                    Your customers want clarity and certainty. They trust you as
                    an expert. Be sure to clearly and quickly communicate any
                    changes to the schedule of works and any additional costs.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="border-l-4 border-highlight pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">✍️</div>
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Communicate clearly and professionally
                  </h3>
                  <p className="text-sm mb-4">
                    When clients invest in their home, they expect a
                    professional quote. All quotes must be written in plain
                    English. Offers should be clear, understandable, realistic
                    and include VAT along with the payment method. Don't message
                    the fee you've paid to The Builder Network when creating the
                    quote.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 5 */}
            <div className="border-l-4 border-highlight pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Deliver outstanding work and be proactive
                  </h3>
                  <p className="text-sm mb-4">
                    The most important thing is carrying out quality work. Only
                    take on leads you can complete, and never cancel jobs you
                    have already started. Keep communicating with the customer
                    and inform them of any problems. By doing this, you'll avoid
                    possible complaints. Remember, you can always contact us for
                    advice on how to resolve issues with customers.
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 6 */}
            <div className="border-l-4 border-highlight pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Accepting our Quality Standards
                  </h3>
                  <p className="text-sm mb-4">
                    By signing up as a tradesperson and using our service, you
                    accept and agree to these quality requirements. In the event
                    of complaints, we will conduct an investigation that could
                    result in the deletion of your The Builder Network account.
                    If you have any questions, please reach out to us at
                    info@thebuildernetwork.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TradespersonCTASection title="Join for free and start getting the work you want" />
    </>
  );
};

export default QualityRequirements;
