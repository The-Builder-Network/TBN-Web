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
  Scissors,
  Car,
  ChevronRight
} from "lucide-react";

const categories = [
  { name: "Builders", icon: Hammer, color: "from-orange-500 to-amber-500", jobs: "2,340" },
  { name: "Plumbers", icon: Droplets, color: "from-blue-500 to-cyan-500", jobs: "1,890" },
  { name: "Electricians", icon: Zap, color: "from-yellow-500 to-orange-500", jobs: "1,560" },
  { name: "Roofers", icon: Home, color: "from-slate-600 to-slate-800", jobs: "980" },
  { name: "Painters", icon: Paintbrush, color: "from-purple-500 to-pink-500", jobs: "1,240" },
  { name: "Plastererers", icon: Wrench, color: "from-stone-500 to-stone-700", jobs: "760" },
  { name: "Heating Engineers", icon: Wind, color: "from-red-500 to-orange-500", jobs: "890" },
  { name: "Landscapers", icon: Trees, color: "from-green-500 to-emerald-600", jobs: "1,120" },
  { name: "Carpenters", icon: Scissors, color: "from-amber-600 to-yellow-700", jobs: "670" },
  { name: "Driveway Specialists", icon: Car, color: "from-gray-600 to-gray-800", jobs: "450" },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Trade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the right professional for your project from our network of verified tradespeople
          </p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/tradespeople?category=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl bg-card p-6 shadow-card card-hover border"
            >
              {/* Icon Container */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4 text-white shadow-lg`}>
                <category.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {category.jobs} jobs
              </p>

              {/* Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <ChevronRight className="h-5 w-5 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            to="/tradespeople"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View all categories
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
