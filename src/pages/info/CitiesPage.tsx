import { Link } from "react-router-dom";
import { cities } from "@/constants/cities";
import CTASection from "@/components/home/sections/CTASection";
import { Helmet } from "react-helmet-async";

const Cities = () => {
  return (
    <>
      <Helmet>
        <title>Cities We Cover | The Builder Network</title>
        <meta
          name="description"
          content="Builder Network operates across hundreds of UK cities. Find trusted tradespeople near you."
        />
      </Helmet>
      <div className="flex-1 container py-16 md:py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Find Tradespeople in Your Area
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse tradespeople by city across the UK
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to="/trades"
              className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <h3 className="font-medium">{city.name}</h3>
            </Link>
          ))}
        </div>
      </div>
      <CTASection title="Help is now closer to you than ever" />
    </>
  );
};

export default Cities;
