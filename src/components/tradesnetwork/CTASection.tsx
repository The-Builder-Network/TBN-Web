import CTAStrip from "../shared/CTAStrip";

interface TradespersonCTASectionProps {
  title: string;
  description?: string;
  ctaText?: string;
  /** Route path, or a mailto: link */
  to?: string;
}

const TradespersonCTASection = ({
  title,
  description = "Join for free and get leads that are just perfect for you.",
  ctaText = "Sign up for free",
  to = "/tradesnetwork",
}: TradespersonCTASectionProps) => {
  return (
    <section className="pt-16 bg-muted">
      <div className="container flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground mb-14">{description}</p>
      </div>
      <CTAStrip text={ctaText} to={to} />
    </section>
  );
};

export default TradespersonCTASection;
