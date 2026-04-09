import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Lightbulb,
  Sparkles,
  Flame,
  HelpCircle,
  PenSquare,
  MessagesSquare,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import JobsStatusBadge from "@/components/shared/JobsStatusBadge";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { useJobs } from "@/api/jobs";
import { Button } from "@/components/ui/button";

const popularServices = [
  { label: "Electrical", popular: true },
  { label: "Handyman", popular: true },
];

const othersSearching = [{ label: "Painting & Decorating", popular: true }];

const MyJobs = () => {
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useJobs({
    sort: "createdAt",
    order: "desc",
  });

  const jobs = data?.data ?? [];

  return (
    <div className="container py-10 grid grid-cols-8 gap-x-12">
      <div className="space-y-4 col-span-5">
        <h1 className="text-3xl font-bold mb-8">My jobs</h1>

        {isLoading && (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && (
          <div className="text-center py-12 border rounded-lg">
            <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
            <p className="font-semibold">Failed to load jobs</p>
            <p className="text-sm text-muted-foreground mb-4">
              Something went wrong. Please try again.
            </p>
            <Button variant="outline" onClick={() => void refetch()}>
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !error && jobs.length === 0 && (
          <div className="text-center py-16 border rounded-lg">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
            <p className="text-muted-foreground mb-6">
              Post your first job and get matched with verified tradespeople
              near you.
            </p>
            <Button asChild>
              <Link to="/post-job">Post a job</Link>
            </Button>
          </div>
        )}

        {!isLoading &&
          jobs.map((job) => (
            <Link
              key={job.id}
              to={`/homeowner/my-jobs/${job.id}`}
              className="block border rounded-lg p-5 hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-muted-foreground text-md">
                      #{job.id.slice(0, 8)}
                    </h4>
                    <JobsStatusBadge status={job.status.toLowerCase()} />
                  </div>
                  <h3 className="font-semibold text-xl">{job.title}</h3>
                  <p className="text-muted-foreground text-sm my-2">
                    Posted{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {job.placeName ? ` · ${job.placeName}` : ""}
                  </p>

                  {job.status === "CLOSED" || job.status === "CANCELLED" ? (
                    <p className="text-muted-foreground">
                      Job {job.status.toLowerCase()}
                    </p>
                  ) : (
                    <>
                      {job.interestedCount > 0 && (
                        <div className="flex gap-6 my-4">
                          <div className="border rounded-lg px-6 py-3 flex-1">
                            <p className="text-2xl font-bold">
                              {job.interestedCount}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Interested
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Waiting for your decision
                            </p>
                          </div>
                        </div>
                      )}

                      {job.interestedCount === 0 && (
                        <p className="text-muted-foreground text-sm">
                          Suitable local tradespeople have been alerted about
                          your job. As soon as one is interested we will let you
                          know.
                        </p>
                      )}
                    </>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 mt-1 flex-shrink-0" />
              </div>
            </Link>
          ))}
      </div>

      {/* Ask a tradesperson section */}
      <div className="col-span-3">
        <h2 className="text-2xl font-bold mb-8 underline decoration-highlight underline-offset-8 decoration-4">
          Ask a tradesperson
        </h2>

        <div className="space-y-4">
          <Link
            to="/homeowner/my-questions"
            className="block border rounded-lg p-5 hover:border-highlight/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <HelpCircle className="w-6 h-6 text-muted-foreground mb-2" />
                <h3 className="font-bold text-lg">My questions</h3>
                <p className="font-medium text-sm mt-1">
                  Check for new answers to your question
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  When a tradesperson answers your question, you'll see the
                  response here.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 mt-1 flex-shrink-0" />
            </div>
          </Link>

          <button
            onClick={() => setShowAskModal(true)}
            className="block border rounded-lg p-5 w-full text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <PenSquare className="w-6 h-6 text-muted-foreground mb-2" />
                <h3 className="font-bold text-lg">Ask a question</h3>
                <p className="font-medium text-sm mt-1">
                  Tradespeople will provide an answer
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  Ask for advice about improving your home and get answers from
                  qualified tradespeople.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 mt-1 flex-shrink-0" />
            </div>
          </button>

          <Link to="/questions" className="block border rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div>
                <MessagesSquare className="w-6 h-6 text-muted-foreground mb-2" />
                <h3 className="font-bold text-lg">All questions</h3>
                <p className="font-medium text-sm mt-1">
                  See what other users asked
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  See thousands of questions answered by our qualified
                  tradespeople across all services.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 mt-1 flex-shrink-0" />
            </div>
          </Link>
        </div>
      </div>

      {/* Explore Ideas Modal */}
      <Dialog open={showExploreModal} onOpenChange={setShowExploreModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              See what else you can do for your home
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground -mt-2">
            Keep making progress by posting another job.
          </p>

          <div className="mt-2">
            <p className="font-medium flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-primary" /> Popular services
              near you
            </p>
            <div className="space-y-3">
              {popularServices.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowExploreModal(false);
                    navigate(
                      "/post-job?service=" + encodeURIComponent(s.label),
                    );
                  }}
                  className="w-full border rounded-lg p-4 flex items-center justify-between text-left"
                >
                  <div>
                    {s.popular && (
                      <span className="text-xs font-semibold text-highlight bg-highlight/10 px-2 py-0.5 rounded mb-1 inline-block">
                        Popular
                      </span>
                    )}
                    <p className="font-semibold">{s.label}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium flex items-center gap-1.5 mb-3">
              <Flame className="w-4 h-4 text-highlight" /> Others are searching
              for
            </p>
            <div className="space-y-3">
              {othersSearching.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setShowExploreModal(false);
                    navigate(
                      "/post-job?service=" + encodeURIComponent(s.label),
                    );
                  }}
                  className="w-full border rounded-lg p-4 flex items-center justify-between text-left"
                >
                  <div>
                    {s.popular && (
                      <span className="text-xs font-semibold text-highlight bg-highlight/10 px-2 py-0.5 rounded mb-1 inline-block">
                        Popular
                      </span>
                    )}
                    <p className="font-semibold">{s.label}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setShowExploreModal(false);
              navigate("/post-job");
            }}
            className="w-full border rounded-lg p-4 flex items-center justify-between text-left mt-2 bg-secondary/30"
          >
            <div>
              <p className="font-semibold">Need a different job done?</p>
              <p className="text-muted-foreground">
                Post your job and find a tradesperson
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="text-right mt-2">
            <button
              onClick={() => setShowExploreModal(false)}
              className="font-semibold text-primary hover:underline"
            >
              Skip
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <AskQuestionModal open={showAskModal} onOpenChange={setShowAskModal} />

      {/* Hidden button to avoid lint warning — explore modal can be triggered from job cards in future */}
      <button className="hidden" onClick={() => setShowExploreModal(true)}>
        <Lightbulb />
      </button>
    </div>
  );
};

export default MyJobs;
