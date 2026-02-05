import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jennifer M.",
    rating: 5,
    text: "Found an amazing builder for our kitchen extension. The whole process was seamless.",
    project: "Kitchen Extension",
  },
  {
    id: 2,
    name: "David C.",
    rating: 5,
    text: "Got 3 quotes within a day. The tradesperson we chose was professional and on time.",
    project: "Bathroom Renovation",
  },
  {
    id: 3,
    name: "Sarah W.",
    rating: 5,
    text: "Our electrician was fully qualified and did an excellent job rewiring our home.",
    project: "Complete Rewiring",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          What our customers say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-lg border bg-card"
            >
              <div className="flex gap-0.5 mb-3">
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

              <p className="text-sm text-foreground mb-4">
                "{testimonial.text}"
              </p>

              <div className="text-sm">
                <span className="font-medium text-foreground">{testimonial.name}</span>
                <span className="text-muted-foreground"> · {testimonial.project}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
