import CTAStrip from "@/components/shared/CTAStrip";

interface CTASectionProps {
  title: string;
  description?: string;
  ctaText?: string;
  /** Route path, or a mailto: link */
  to?: string;
}

const CTASection = ({
  title,
  description = "Post your job for free and get matched with qualified tradespeople in your area.",
  ctaText = "Post your job now",
  to = "/post-job",
}: CTASectionProps) => {
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

export default CTASection;
