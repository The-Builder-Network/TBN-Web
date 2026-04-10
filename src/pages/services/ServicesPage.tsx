import { Link } from "react-router-dom";
import { services } from "@/constants/services";
import CTASection from "@/components/home/sections/CTASection";
import { Helmet } from "react-helmet-async";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | The Builder Network</title>
        <meta
          name="description"
          content="Browse all home improvement services offered through Builder Network, from plumbing to extensions."
        />
      </Helmet>
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">Our services</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The Builder Network makes it easy for you to find tradespeople for a
          rapidly growing range of home improvement jobs throughout the United
          Kingdom. You can request quotes for the following services.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="flex items-center gap-2 group"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="group-hover:text-primary group-hover:underline transition-colors">
                {service.name}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <CTASection title="Right tradespersons at your service" />
    </>
  );
};

export default Services;
