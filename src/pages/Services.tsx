import { services } from "@/data/services";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-6">Our services</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The Builder Network makes it easy for you to find tradespeople for a
          rapidly growing range of home improvement jobs throughout the United
          Kingdom. You can request quotes for the following services.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </main>
      <CTASection title="Right tradespersons at your service" />
      <Footer />
    </div>
  );
};

export default Services;
