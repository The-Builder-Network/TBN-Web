import { useParams, Link, Navigate } from "react-router-dom";
import { trades } from "@/data/trades";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";

const TradePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const trade = trades.find((t) => t.slug === slug);

  if (!trade) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/20">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                to="/trades"
                className="hover:text-foreground transition-colors"
              >
                Trades
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{trade.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container py-8 md:py-12">
          <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left Column - Content */}
            <div className="col-span-3 h-full flex flex-col justify-center items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {trade.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {trade.description}
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="order-first md:order-last col-span-2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img
                  src={trade.imageUrl}
                  alt={trade.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-muted/30 py-16">
          <div className="container">
            <div className=" space-y-8">
              {trade.details.map((detail, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {detail.sectionTitle}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {detail.sectionText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        {trade.faqs.length > 0 && (
          <div className="container py-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                FAQ: Your questions about {trade.name.toLowerCase()} answered
              </h2>
              <p className="text-muted-foreground mb-8">
                Here are some clear answers to common questions about{" "}
                {trade.name.toLowerCase()}, so you know what to expect for your
                project.
              </p>

              <Accordion type="single" collapsible className="space-y-4">
                {trade.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border rounded-lg px-6 bg-background"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
        <CTASection title={`Ready to hire a ${trade.name.toLowerCase()}?`} />
      </main>
      <Footer />
    </div>
  );
};

export default TradePage;
