import CTAStrip from "../shared/CTAStrip";
import ScrollToTop from "../shared/ScrollToTop";

const TradespersonCTASection = ({ title }) => {
  return (
    <section className="pt-16 bg-muted">
      <div className="container flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground mb-14">
          Join for free and get leads that are just perfect for you.
        </p>
      </div>
      <CTAStrip text="Sign up for free" to="/tradesnetwork" />
    </section>
  );
};

export default TradespersonCTASection;
