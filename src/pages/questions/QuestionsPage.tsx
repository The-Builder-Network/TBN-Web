import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ChevronRight, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "boneyard-js/react";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";
import SortOptionsModal from "@/components/modals/SortOptionsModal";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useQuestions } from "@/api/questions";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet-async";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Most recent" },
  { value: "answerCount", label: "Most answered" },
] as const;

const QuestionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isTradesperson, isAuthenticated } = useAuth();

  const serviceSlug = searchParams.get("service") ?? undefined;
  const sort =
    (searchParams.get("sort") as "createdAt" | "answerCount") ?? "createdAt";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isLoading, error } = useQuestions({
    serviceSlug,
    sort,
    order: "desc",
    page,
    perPage: 20,
  });

  const questions = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;
  const total = data?.meta.total ?? 0;

  const handleServiceChange = (slug: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug) {
        next.set("service", slug);
      } else {
        next.delete("service");
      }
      next.delete("page");
      return next;
    });
  };

  const handleSortApply = (newSort: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", newSort);
      next.delete("page");
      return next;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Most recent";

  return (
    <div className="flex-1 container py-10">
      <Helmet>
        <title>Ask a Tradesperson | The Builder Network</title>
        <meta
          name="description"
          content="Get expert home improvement advice from verified tradespeople."
        />
      </Helmet>
      <h1 className="text-3xl font-bold mb-2">Ask a tradesperson</h1>
      <p className="text-md text-muted-foreground mb-6">
        Get the latest advice about improving your home by asking our expert
        tradespeople.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-muted-foreground">Filter by Service</p>
          </div>

          <div className="mb-4">
            <JobServiceCombobox
              value={serviceSlug ?? ""}
              onChange={handleServiceChange}
              placeholder="All services"
              triggerClassName="bg-background w-full"
              showAllOption
            />
          </div>

          <div className="flex items-center justify-between my-4">
            <p className="text-md font-medium flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              {`${total.toLocaleString()} question${total !== 1 ? "s" : ""}`}
            </p>
            <button
              className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
              onClick={() => setSortModalOpen(true)}
            >
              <Filter className="w-4 h-4" /> {currentSortLabel} ▾
            </button>
          </div>

          <Skeleton name="questions-list" loading={isLoading}>
            {/* Error state */}
            {error && (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-muted-foreground mb-3">
                  Failed to load questions.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </Button>
              </div>
            )}

            {/* Empty state */}
            {!error && questions.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="font-medium mb-1">No questions found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Be the first to ask a question
                  {serviceSlug ? " in this category" : ""}.
                </p>
                <Button onClick={() => setAskModalOpen(true)}>
                  Ask a question
                </Button>
              </div>
            )}

            {/* Questions list */}
            {!error && questions.length > 0 && (
              <div className="space-y-4">
                {questions.map((q) => (
                  <Link
                    key={q.id}
                    to={`/questions/${q.id}`}
                    className="block border rounded-lg p-5 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          #{q.questionNumber}
                        </p>
                        {q.serviceSlug && (
                          <p className="text-sm text-highlight font-medium mb-1 capitalize">
                            {q.serviceSlug.replace(/-/g, " ")}
                          </p>
                        )}
                        <h3 className="font-bold text-lg">{q.title}</h3>
                        <p className="text-sm text-muted-foreground my-0.5">
                          {q.authorName}
                        </p>
                        <p className="text-sm text-muted-foreground my-2 line-clamp-2">
                          {q.body}
                        </p>
                        {q.body.length > 100 && (
                          <span className="text-sm text-primary font-medium">
                            Read more
                          </span>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />{" "}
                            {q.answerCount} answer
                            {q.answerCount !== 1 ? "s" : ""}
                          </span>
                          {q.hasBestAnswer && (
                            <span className="text-highlight font-medium">
                              ★ Best answer
                            </span>
                          )}
                          <span>
                            {new Date(q.createdAt).toLocaleString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 mt-1 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page - 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                    {Array.from({ length: Math.min(5, totalPages) }).map(
                      (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              isActive={pageNum === page}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(pageNum);
                              }}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      },
                    )}
                    {totalPages > 5 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive={page === totalPages}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(totalPages);
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </Skeleton>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {isTradesperson ? (
            <>
              <div className="border rounded-lg p-5 bg-secondary/30">
                <p className="font-bold text-lg mb-2">Your leads</p>
                <p className="text-sm text-muted-foreground mb-4">
                  View and manage all the leads you've received from homeowners.
                </p>
                <Button
                  className="w-full"
                  onClick={() => navigate("/tradesperson/my-leads")}
                >
                  View my leads
                </Button>
              </div>
              <div className="border rounded-lg p-5">
                <p className="font-bold text-lg mb-2">Answer questions</p>
                <p className="text-sm text-muted-foreground">
                  Share your expertise by answering homeowner questions and grow
                  your reputation.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="border rounded-lg p-5 bg-secondary/30">
                <p className="font-bold text-lg mb-2">
                  Need some tips or advice?
                </p>
                <Button
                  className="w-full mt-2"
                  onClick={() => setAskModalOpen(true)}
                >
                  Ask a question
                </Button>
              </div>
              {isAuthenticated && (
                <div className="border rounded-lg p-5">
                  <p className="font-bold text-lg mb-2">Your questions</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    View and manage all the questions you have asked.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/homeowner/my-questions")}
                  >
                    View your questions
                  </Button>
                </div>
              )}
              <div className="border rounded-lg p-5">
                <p className="font-bold text-lg mb-2">Ready to hire?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Post your job in minutes, browse real reviews and choose who
                  to speak to.
                </p>
                {!isAuthenticated ? (
                  <Link
                    to={
                      serviceSlug
                        ? `/post-job?service=${serviceSlug}`
                        : "/post-job"
                    }
                  >
                    <Button
                      variant="outline"
                      className="w-full hover:bg-secondary transition-colors font-medium border-primary text-primary hover:text-primary"
                    >
                      Post a job
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to={
                      serviceSlug
                        ? `/post-job?service=${serviceSlug}`
                        : "/post-job"
                    }
                  >
                    <Button
                      variant="outline"
                      className="w-full hover:bg-secondary transition-colors font-medium border-primary text-primary hover:text-primary"
                    >
                      Post a job
                    </Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <SortOptionsModal
        open={sortModalOpen}
        onOpenChange={setSortModalOpen}
        onApply={handleSortApply}
      />

      <AskQuestionModal
        open={askModalOpen}
        onOpenChange={setAskModalOpen}
        initialService={serviceSlug ?? ""}
      />
    </div>
  );
};

export default QuestionsPage;
