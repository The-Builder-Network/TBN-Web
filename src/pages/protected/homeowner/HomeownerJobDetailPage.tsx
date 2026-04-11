import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  Users,
  BadgeCheck,
  Image,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "boneyard-js/react";
import { ReviewForm } from "@/components/shared/ReviewForm";
import JobsStatusBadge from "@/components/shared/JobsStatusBadge";
import { useJob, useUpdateJobStatus } from "@/api/jobs";
import { useToast } from "@/hooks/use-toast";
import type { LeadStatus, QuoteStatus } from "@/api/types";

// ── Helpers ───────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPence(pence?: number | null) {
  if (!pence) return null;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

function leadStatusLabel(status: LeadStatus) {
  const map: Record<LeadStatus, string> = {
    AVAILABLE: "Available",
    INTERESTED: "Interested",
    SHORTLISTED: "Shortlisted",
    CONTACTED: "Contacted",
    HIRED: "Hired",
    REJECTED: "Rejected",
    EXPIRED: "Expired",
  };
  return map[status] ?? status;
}

function quoteStatusColor(status: QuoteStatus) {
  if (status === "ACCEPTED")
    return "bg-green-100 text-green-700 border-green-200";
  if (status === "DECLINED" || status === "WITHDRAWN")
    return "bg-red-100 text-red-700 border-red-200";
  return "bg-blue-100 text-blue-700 border-blue-200";
}

// ── Component ─────────────────────────────────────────────────

const HomeownerJobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: job, isLoading, error, refetch } = useJob(jobId!);
  const updateStatusMutation = useUpdateJobStatus();
  const [reviewDone, setReviewDone] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const responses = job?.responses ?? [];
  const interestedResponses = responses.filter((r) =>
    ["INTERESTED", "SHORTLISTED"].includes(r.leadStatus),
  );
  const shortlistedResponses = responses.filter(
    (r) => r.leadStatus === "SHORTLISTED",
  );
  const quotedResponses = responses.filter((r) => !!r.quote);

  function handleCancel() {
    setCancelDialogOpen(true);
  }

  function confirmCancel() {
    if (!jobId) return;
    updateStatusMutation.mutate(
      { id: jobId, status: "CANCELLED" },
      {
        onSuccess: () => {
          setCancelDialogOpen(false);
          toast({ title: "Job cancelled" });
          void refetch();
        },
        onError: () => {
          setCancelDialogOpen(false);
          toast({
            title: "Could not cancel job",
            variant: "destructive",
          });
        },
      },
    );
  }

  if (isLoading) {
    return (
      <div className="container py-10 max-w-4xl">
        <Skeleton name="job-detail" loading />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container py-10 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/homeowner/my-jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Jobs
          </Link>
        </Button>
        <div className="border rounded-lg p-12 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
          <p className="font-semibold text-lg mb-2">Job not found</p>
          <p className="text-muted-foreground mb-6">
            This job doesn't exist or you don't have permission to view it.
          </p>
          <Button onClick={() => navigate("/homeowner/my-jobs")}>
            Back to My Jobs
          </Button>
        </div>
      </div>
    );
  }

  const canCancel =
    !["CANCELLED", "CLOSED", "COMPLETED"].includes(job.status) &&
    !updateStatusMutation.isPending;

  return (
    <div className="container py-10 max-w-4xl">
      <Helmet>
        <title>{job.title} — My Jobs | The Builder Network</title>
        <meta
          name="description"
          content={`View details, quotes and status for your job: ${job.title}`}
        />
      </Helmet>
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/homeowner/my-jobs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Jobs
        </Link>
      </Button>

      {/* ── Job Summary Card ── */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground font-medium">
                #{job.jobNumber}
              </span>
              <JobsStatusBadge status={job.status.toLowerCase()} />
            </div>
            <h1 className="text-2xl font-bold mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {job.placeName && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.placeName} ({job.postcode})
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted {formatDate(job.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {responses.length} response{responses.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={updateStatusMutation.isPending}
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel job
            </Button>
          )}
        </div>

        {job.description && job.description !== job.title && (
          <p className="mt-4 text-muted-foreground">{job.description}</p>
        )}
      </div>

      {/* ── Job Photos ── */}
      {job.attachments && job.attachments.length > 0 && (
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="font-semibold flex items-center gap-2 mb-4">
            <Image className="h-4 w-4" />
            Photos ({job.attachments.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {job.attachments.map((att) => {
              const isImage = att.mimeType?.startsWith("image/");
              return isImage ? (
                <a
                  key={att.id}
                  href={att.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-lg overflow-hidden border hover:border-primary/50 transition-colors"
                >
                  <img
                    src={att.fileUrl}
                    alt={att.fileName}
                    className="w-full h-full object-cover"
                  />
                </a>
              ) : (
                <a
                  key={att.id}
                  href={att.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 border rounded-lg hover:border-primary/50 transition-colors text-sm"
                >
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{att.fileName}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Responses Tabs ── */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({responses.length})</TabsTrigger>
          <TabsTrigger value="interested">
            Interested ({interestedResponses.length})
          </TabsTrigger>
          <TabsTrigger value="shortlisted">
            Shortlisted ({shortlistedResponses.length})
          </TabsTrigger>
          <TabsTrigger value="quotes">
            Quotes ({quotedResponses.length})
          </TabsTrigger>
        </TabsList>

        {(["all", "interested", "shortlisted", "quotes"] as const).map(
          (tab) => {
            const tabResponses =
              tab === "all"
                ? responses
                : tab === "interested"
                  ? interestedResponses
                  : tab === "shortlisted"
                    ? shortlistedResponses
                    : quotedResponses;

            return (
              <TabsContent key={tab} value={tab}>
                {tabResponses.length === 0 ? (
                  <div className="border rounded-lg p-12 text-center">
                    <Users className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <p className="font-medium">
                      {tab === "all"
                        ? "No tradespeople have responded yet"
                        : `No ${tab} tradespeople yet`}
                    </p>
                    {tab === "all" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        We've notified matched tradespeople in your area.
                        They'll appear here when they express interest.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tabResponses.map((response) => (
                      <div
                        key={response.leadId}
                        className="border rounded-lg p-5"
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {response.tradesperson.avatarUrl ? (
                              <img
                                src={response.tradesperson.avatarUrl}
                                alt={response.tradesperson.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-lg font-bold text-muted-foreground">
                                {response.tradesperson.name.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-semibold">
                                {response.tradesperson.name}
                              </h3>
                              {response.tradesperson.verified && (
                                <BadgeCheck className="h-4 w-4 text-primary" />
                              )}
                              <Badge variant="outline" className="text-xs">
                                {leadStatusLabel(response.leadStatus)}
                              </Badge>
                            </div>

                            {response.tradesperson.companyName && (
                              <p className="text-sm text-muted-foreground">
                                {response.tradesperson.companyName}
                              </p>
                            )}

                            {response.tradesperson.reviewCount > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium">
                                  {response.tradesperson.avgRating.toFixed(1)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({response.tradesperson.reviewCount} review
                                  {response.tradesperson.reviewCount !== 1
                                    ? "s"
                                    : ""}
                                  )
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            {response.tradesperson.username && (
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  to={`/tradesperson/${response.tradesperson.username}`}
                                >
                                  View profile
                                </Link>
                              </Button>
                            )}
                            <Button size="sm" asChild>
                              <Link
                                to={`/homeowner/contacts?tradespersonId=${response.tradesperson.id}`}
                              >
                                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                                Start chat
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Quote */}
                        {response.quote && (
                          <div className="mt-4 ml-16 border rounded-lg p-4 bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Quote</span>
                              <Badge
                                variant="outline"
                                className={`text-xs ${quoteStatusColor(response.quote.status)}`}
                              >
                                {response.quote.status.toLowerCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {response.quote.message}
                            </p>
                            {(response.quote.amountPence ||
                              response.quote.estimateRange) && (
                              <p className="font-semibold text-sm">
                                {response.quote.amountPence
                                  ? formatPence(response.quote.amountPence)
                                  : response.quote.estimateRange}
                              </p>
                            )}
                            {response.quote.status === "PENDING" && (
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                                  Accept quote
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="mr-1.5 h-3.5 w-3.5" />
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          },
        )}
      </Tabs>

      {/* Review form — shown once when job is COMPLETED */}
      {job.status === "COMPLETED" &&
        !reviewDone &&
        (() => {
          const hiredResponse = responses.find((r) => r.leadStatus === "HIRED");
          if (!hiredResponse) return null;
          return (
            <div className="mt-6">
              <ReviewForm
                jobId={job.id}
                tradespersonId={hiredResponse.tradesperson.id}
                tradespersonName={
                  hiredResponse.tradesperson.companyName ??
                  hiredResponse.tradesperson.name
                }
                onSuccess={() => setReviewDone(true)}
              />
            </div>
          );
        })()}

      {/* ── Cancel confirmation dialog ── */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel job</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel job{" "}
              <span className="font-semibold">#{job?.jobNumber}</span>
              {job?.title ? ` — ${job.title}` : ""}? This action cannot be
              undone. Tradespeople who expressed interest will be notified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              disabled={updateStatusMutation.isPending}
            >
              Keep job
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? "Cancelling…" : "Cancel job"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeownerJobDetail;
