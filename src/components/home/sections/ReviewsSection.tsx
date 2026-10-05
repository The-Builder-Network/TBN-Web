import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StarRating } from "@/components/shared/StarRating";
import { useFeaturedReviews } from "@/api/reviews";

/** Real reviews only — the section is omitted when none are available. */
const ReviewsSection = () => {
  const reviews = useFeaturedReviews(3);
  if (reviews.length === 0) return null;

  return (
    <section className="bg-primary/[0.04] py-16 md:py-24">
      <div className="container">
        <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What our customers say
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Real people. Real feedback.
            </p>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Browse rated tradespeople
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {reviews.map((review) => {
            const pro = review.tradesperson;
            return (
              <li
                key={review.id}
                className="reveal flex w-[85%] shrink-0 snap-start flex-col rounded-xl border bg-card p-6 shadow-card md:w-auto"
              >
                <div className="h-4">
                  {review.rating > 0 && (
                    <StarRating rating={review.rating} size="sm" />
                  )}
                </div>
                <blockquote className="mt-4 line-clamp-5 flex-1 text-sm leading-relaxed text-foreground">
                  “{review.comment}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t pt-4">
                  {review.authorAvatar ? (
                    <img
                      src={review.authorAvatar}
                      alt=""
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary"
                      aria-hidden
                    >
                      {review.authorName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0 text-sm">
                    <p className="truncate font-semibold text-foreground">
                      {review.authorName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {review.jobTitle ? `${review.jobTitle} · ` : ""}
                      <Link
                        to={`/tradesperson/${pro.username}`}
                        className="hover:text-primary hover:underline"
                      >
                        {pro.companyName || pro.name}
                      </Link>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ReviewsSection;
