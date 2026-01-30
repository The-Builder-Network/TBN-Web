import { Link } from "react-router-dom";
import { 
  Hammer, 
  Wrench, 
  Zap, 
  Home, 
  Paintbrush, 
  Droplets,
  Wind,
  Trees,
} from "lucide-react";

const categories = [
  { name: "Builders", icon: Hammer },
  { name: "Plumbers", icon: Droplets },
  { name: "Electricians", icon: Zap },
  { name: "Roofers", icon: Home },
  { name: "Painters", icon: Paintbrush },
  { name: "Plasterers", icon: Wrench },
  { name: "Heating Engineers", icon: Wind },
  { name: "Landscapers", icon: Trees },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Browse by trade
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/tradespeople?category=${category.name.toLowerCase()}`}
              className="group flex items-center gap-3 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
            >
              <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                <category.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/tradespeople"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all trades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
