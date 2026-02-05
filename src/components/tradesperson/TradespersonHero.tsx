import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const TradespersonHero = () => {
  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden pattern">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-12 items-center">
          {/* Left Column: Text and Form */}
          <div className="space-y-12 col-span-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background">
              The reliable way to get
              <br /> the work you want
            </h1>

            <div className="bg-card w-fit border rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">View local trade work</h2>

              <form className="space-y-4">
                <div className="flex flex-row items-center justify-between gap-2">
                  <Select>
                    <SelectTrigger className="w-full h-14 text-muted-foreground">
                      <SelectValue placeholder="Your main trade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="carpenter">Carpenter</SelectItem>
                      <SelectItem value="builder">Builder</SelectItem>
                      <SelectItem value="painter">Painter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Pincode" className="col-span-2 h-14" />
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Your email to receive leads"
                    type="email"
                    className="h-14 text-lg"
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  By clicking Sign up for free, you agree to Home Pro Connect{" "}
                  <Link to="/terms" className="underline">
                    Terms and Conditions
                  </Link>
                  .
                  <br />
                  For information on how we process your data, see our{" "}
                  <Link to="/privacy" className="underline">
                    Privacy policy
                  </Link>
                  .
                </div>

                <Button className="w-full h-14 font-bold" size="lg">
                  Sign up for free
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative hidden lg:block col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/trades_hero_section_img_1.jpg"
                alt="Tradesperson working"
                className="aspect-square object-cover"
              />

              {/* Overlay Label - Mimicking the "Krystian 5/5" */}
              <div className="absolute bottom-36 left-56 bg-highlight text-black px-4 py-2 rounded-md font-bold shadow-lg flex items-center gap-2">
                <span>Krystian ★ 4.9/5</span>
              </div>

              {/* Green Bounding Box Effect */}
              <div className="absolute top-10 left-56 right-12 bottom-36 border-2 border-highlight pointer-events-none rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradespersonHero;
