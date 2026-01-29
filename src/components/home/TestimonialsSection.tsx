import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Mitchell",
    location: "London",
    rating: 5,
    text: "Absolutely fantastic service! Found an amazing builder for our kitchen extension. The whole process was seamless and the quotes came in within hours.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    project: "Kitchen Extension",
  },
  {
    id: 2,
    name: "David Chen",
    location: "Manchester",
    rating: 5,
    text: "Used BuilderHub to find a plumber for our bathroom renovation. Got 3 quotes within a day and the tradesperson we chose was professional and on time.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    project: "Bathroom Renovation",
  },
  {
    id: 3,
    name: "Sarah Williams",
    location: "Birmingham",
    rating: 5,
    text: "The verification process gives you real peace of mind. Our electrician was fully qualified and did an excellent job rewiring our Victorian terrace.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    project: "Complete Rewiring",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Homeowners
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            See what our customers have to say about their BuilderHub experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-xl relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                  <Quote className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-star text-star"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.project} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
