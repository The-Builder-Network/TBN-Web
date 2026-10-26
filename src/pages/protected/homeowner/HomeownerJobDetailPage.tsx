import { useRef, useState } from "react";
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
  Phone,
  Mail,
  Pencil,
  Plus,
  Trash2,
  Clock,
  Hammer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReviewForm } from "@/components/shared/ReviewForm";
import { StarRating } from "@/components/shared/StarRating";
import JobsStatusBadge from "@/components/shared/JobsStatusBadge";
import {
  useJob,
  useShortlist,
  useDeclineInterest,
  useHire,
  useCompleteJob,
  useCloseJob,
  useUpdateJobDescription,
  useAddJobAttachments,
  useRemoveJobAttachment,
} from "@/api/jobs";
import { extractError } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import type { JobDetail, JobResponse, LeadStatus } from "@/api/types";

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

const LEAD_LABEL: Record<LeadStatus, string> = {
  AVAILABLE: "Invited",
  INTERESTED: "Interested",
  SHORTLISTED: "Shortlisted",
  HIRED: "Hired",
  DECLINED: "Declined",
  WITHDRAWN: "Withdrew",
  NOT_SELECTED: "Not selected",
  EXPIRED: "Expired",
};

const CLOSE_REASONS = [
  "I've found a tradesperson elsewhere",
  "I no longer need this work done",
  "I want to post the job again with more detail",
  "The quotes were too expensive",
  "Other",
];

type Confirm =
  | { kind: "shortlist" | "hire" | "decline"; response: JobResponse }
  | { kind: "complete" }
  | { kind: "close" }
  | null;

// ── Response card ────────────────────────────────────────────

function ResponseCard({
  response,
  job,
  onAction,
}: {
  response: JobResponse;
  job: JobDetail;
  onAction: (c: Confirm) => void;
}) {
  const tp = response.tradesperson;
  const open = job.status === "ACTIVE";
  const inactive = ["DECLINED", "WITHDRAWN", "NOT_SELECTED", "EXPIRED"].includes(
    response.leadStatus,
  );

  return (
    <div className={`border rounded-lg p-5 ${inactive ? "opacity-60" : ""}`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
            {tp.avatarUrl ? (
              <img src={tp.avatarUrl} alt={tp.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-muted-foreground">{tp.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold">{tp.companyName || tp.name}</h3>
              {tp.verified && <BadgeCheck className="h-4 w-4 text-primary" aria-label="Verified" />}
              <Badge variant="outline" className="text-xs">
                {response.leadStatus === "AVAILABLE" && !response.invited
                  ? "Matched"
                  : LEAD_LABEL[response.leadStatus]}
              </Badge>
            </div>
            {tp.companyName && <p className="text-sm text-muted-foreground">{tp.name}</p>}
            {tp.reviewCount > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{tp.avgRating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">
                  ({tp.reviewCount} review{tp.reviewCount !== 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end flex-shrink-0">
          {tp.username && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/tradesperson/${tp.username}`}>View profile</Link>
            </Button>
          )}
          {response.conversationId && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/homeowner/contacts?conversationId=${response.conversationId}`}>
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Message
              </Link>
            </Button>
          )}
          {open && response.leadStatus === "INTERESTED" && (
            <Button size="sm" onClick={() => onAction({ kind: "shortlist", response })}>
              Shortlist
            </Button>
          )}
          {open && response.leadStatus === "SHORTLISTED" && (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onAction({ kind: "hire", response })}
            >
              <Hammer className="mr-1.5 h-3.5 w-3.5" />
              Hire
            </Button>
          )}
          {open && ["INTERESTED", "SHORTLISTED"].includes(response.leadStatus) && (
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => onAction({ kind: "decline", response })}
            >
              Decline
            </Button>
          )}
        </div>
      </div>

      {response.leadStatus === "AVAILABLE" && response.invited && (
        <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> Invited — waiting for them to respond.
        </p>
      )}

      {response.interestMessage && (
        <blockquote className="mt-4 sm:ml-16 border-l-2 pl-3 text-sm text-muted-foreground whitespace-pre-line">
          {response.interestMessage}
        </blockquote>
      )}

      {(tp.phone || tp.email) && (
        <div className="mt-4 sm:ml-16 flex flex-wrap gap-4 text-sm">
          {tp.phone && (
            <a href={`tel:${tp.phone}`} className="flex items-center gap-1.5 text-primary hover:underline">
              <Phone className="h-4 w-4" /> {tp.phone}
            </a>
          )}
          {tp.email && (
            <a href={`mailto:${tp.email}`} className="flex items-center gap-1.5 text-primary hover:underline">
              <Mail className="h-4 w-4" /> {tp.email}
            </a>
          )}
        </div>
      )}

      {response.quote && response.quote.status !== "WITHDRAWN" && (
        <div className="mt-4 sm:ml-16 border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Quote</span>
            {(response.quote.amountPence || response.quote.estimateRange) && (
              <span className="font-semibold text-sm">
                {formatPence(response.quote.amountPence) ?? response.quote.estimateRange}
              </span>
            )}
          </div>
          {response.quote.message !== response.interestMessage && (
            <p className="text-sm text-muted-foreground whitespace-pre-line">{response.quote.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

const HomeownerJobDetail = () => {
  const { jobId = "" } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: job, isLoading, error } = useJob(jobId);
  // Mutations address the job by its id once loaded (the URL may use the job number).
  const id = job?.id ?? jobId;
  const shortlist = useShortlist(id);
  const decline = useDeclineInterest(id);
  const hire = useHire(id);
  const complete = useCompleteJob(id);
  const close = useCloseJob(id);
  const updateDescription = useUpdateJobDescription(id);
  const addAttachments = useAddJobAttachments(id);
  const removeAttachment = useRemoveJobAttachment(id);

  const [confirm, setConfirm] = useState<Confirm>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [closeReason, setCloseReason] = useState(CLOSE_REASONS[0]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const busy =
    shortlist.isPending || decline.isPending || hire.isPending || complete.isPending || close.isPending;

  const fail = (title: string) => (err: unknown) =>
    toast({ title, description: extractError(err), variant: "destructive" });

  function runConfirm() {
    if (!confirm) return;
    const done = (title: string, description?: string) => () => {
      setConfirm(null);
      toast({ title, description });
    };
    switch (confirm.kind) {
      case "shortlist":
        shortlist.mutate(confirm.response.leadId, {
          onSuccess: done("Shortlisted", "You can now see each other's contact details and message."),
          onError: fail("Could not shortlist"),
        });
        break;
      case "decline":
        decline.mutate(
          { leadId: confirm.response.leadId, reason: declineReason.trim() || undefined },
          { onSuccess: done("Declined"), onError: fail("Could not decline") },
        );
        break;
      case "hire":
        hire.mutate(confirm.response.leadId, {
          onSuccess: done("Tradesperson hired", "Other tradespeople have been told the job is taken."),
          onError: fail("Could not hire"),
        });
        break;
      case "complete":
        complete.mutate(undefined, {
          onSuccess: done("Job marked as complete", "Please leave a review below."),
          onError: fail("Could not mark complete"),
        });
        break;
      case "close":
        close.mutate(closeReason, {
          onSuccess: done("Job closed"),
          onError: fail("Could not close job"),
        });
        break;
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 max-w-4xl space-y-4" aria-busy="true">
        <div className="h-8 w-40 rounded bg-muted animate-pulse" />
        <div className="h-40 rounded-lg bg-muted animate-pulse" />
        <div className="h-28 rounded-lg bg-muted animate-pulse" />
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
          <Button onClick={() => navigate("/homeowner/my-jobs")}>Back to My Jobs</Button>
        </div>
      </div>
    );
  }

  const responses = job.responses;
  const shortlisted = responses.filter((r) => r.leadStatus === "SHORTLISTED" || r.leadStatus === "HIRED");
  const hired = responses.find((r) => r.leadStatus === "HIRED");
  const engaged = responses.filter((r) => r.interestedAt || r.invited);
  const isOpen = job.status === "ACTIVE";
  const canClose = job.status === "ACTIVE" || job.status === "HIRED";

  const confirmCopy = (() => {
    if (!confirm) return null;
    if (confirm.kind === "complete")
      return {
        title: "Mark job as complete?",
        body: `Confirm that ${hired?.tradesperson.companyName || hired?.tradesperson.name} has finished the work.`,
        cta: "Mark complete",
      };
    if (confirm.kind === "close")
      return {
        title: "Close this job?",
        body: "Tradespeople will no longer be able to respond. Anyone you're talking to will be told the job is closed.",
        cta: "Close job",
      };
    const name = confirm.response.tradesperson.companyName || confirm.response.tradesperson.name;
    if (confirm.kind === "shortlist")
      return {
        title: `Shortlist ${name}?`,
        body: `You'll swap contact details with ${name} and can message each other. You can shortlist up to ${job.shortlistCap} tradespeople (${shortlisted.length} so far).`,
        cta: "Shortlist",
      };
    if (confirm.kind === "hire")
      return {
        title: `Hire ${name}?`,
        body: "Other tradespeople who responded will be told the job has been taken. You can leave a review once the work is done.",
        cta: "Hire",
      };
    return {
      title: `Decline ${name}?`,
      body: `${name} will be told you've decided not to go ahead with them.`,
      cta: "Decline",
    };
  })();

  return (
    <div className="container py-10 max-w-4xl">
      <Helmet>
        <title>{job.title} — My Jobs | The Builder Network</title>
        <meta name="description" content={`Responses and status for your job: ${job.title}`} />
      </Helmet>
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/homeowner/my-jobs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Jobs
        </Link>
      </Button>

      {/* ── Summary ── */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground font-medium">#{job.jobNumber}</span>
              <JobsStatusBadge status={job.status} />
            </div>
            <h1 className="text-2xl font-bold mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.placeName ? `${job.placeName} (${job.postcode})` : job.postcode}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted {formatDate(job.createdAt)}
              </span>
              {isOpen && job.expiresAt && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Open until {formatDate(job.expiresAt)}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.status === "HIRED" && (
              <Button size="sm" onClick={() => setConfirm({ kind: "complete" })}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as complete
              </Button>
            )}
            {canClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirm({ kind: "close" })}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Close job
              </Button>
            )}
          </div>
        </div>

        {/* What happens next */}
        <div className="mt-4 rounded-md bg-muted/50 p-3 text-sm">
          {job.status === "ACTIVE" &&
            (engaged.length === 0
              ? "We've sent your job to tradespeople nearby. They'll appear below when they're interested."
              : `Shortlist the tradespeople you'd like to talk to (up to ${job.shortlistCap}). Shortlisting swaps contact details so you can discuss the job, then hire the one you choose.`)}
          {job.status === "HIRED" &&
            `You hired ${hired?.tradesperson.companyName || hired?.tradesperson.name}. Once the work is done, mark the job as complete and leave a review.`}
          {job.status === "COMPLETED" && "This job is complete. Thanks for using The Builder Network."}
          {job.status === "CLOSED" && `This job was closed${job.closeReason ? `: ${job.closeReason}` : "."}`}
          {job.status === "EXPIRED" &&
            "This job expired without a hire. Post it again if you still need the work done."}
        </div>

        {/* Description */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold">Description</h2>
            {isOpen && !editing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDraft(job.description);
                  setEditing(true);
                }}
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" />
                Edit
              </Button>
            )}
          </div>
          {editing ? (
            <div className="space-y-2">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={6}
                maxLength={5000}
                aria-label="Job description"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={!draft.trim() || updateDescription.isPending}
                  onClick={() =>
                    updateDescription.mutate(draft.trim(), {
                      onSuccess: () => {
                        setEditing(false);
                        toast({ title: "Description updated" });
                      },
                      onError: fail("Could not update description"),
                    })
                  }
                >
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          )}
        </div>

        {job.answers.length > 0 && (
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {job.answers.map((a, i) => (
              <div key={i} className="rounded-md border p-3">
                <dt className="text-xs text-muted-foreground">{a.question}</dt>
                <dd className="text-sm font-medium">{a.answer}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* ── Photos ── */}
      {(job.attachments.length > 0 || isOpen) && (
        <div className="border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Image className="h-4 w-4" />
              Photos &amp; files ({job.attachments.length})
            </h2>
            {isOpen && job.attachments.length < 10 && (
              <>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  multiple
                  hidden
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    e.target.value = "";
                    if (!files.length) return;
                    addAttachments.mutate(files, {
                      onSuccess: () => toast({ title: "Files added" }),
                      onError: fail("Upload failed"),
                    });
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={addAttachments.isPending}
                  onClick={() => fileInput.current?.click()}
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  {addAttachments.isPending ? "Uploading…" : "Add photos"}
                </Button>
              </>
            )}
          </div>
          {job.attachments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Photos help tradespeople understand the job. Add up to 10 (JPG, PNG, WebP or PDF, 15MB each).
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {job.attachments.map((att) => (
                <div key={att.id} className="relative group">
                  <a
                    href={att.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square rounded-lg overflow-hidden border hover:border-primary/50 transition-colors"
                  >
                    {att.mimeType?.startsWith("image/") ? (
                      <img src={att.fileUrl} alt={att.fileName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex h-full flex-col items-center justify-center gap-2 p-3 text-sm">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <span className="truncate max-w-full">{att.fileName}</span>
                      </span>
                    )}
                  </a>
                  {isOpen && (
                    <button
                      type="button"
                      aria-label={`Remove ${att.fileName}`}
                      disabled={removeAttachment.isPending}
                      onClick={() =>
                        removeAttachment.mutate(att.id, { onError: fail("Could not remove file") })
                      }
                      className="absolute top-1.5 right-1.5 rounded-full bg-background/90 p-1.5 shadow opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Review ── */}
      {hired && (job.status === "HIRED" || job.status === "COMPLETED") && (
        <div className="mb-6">
          {job.review ? (
            <div className="border rounded-lg p-6">
              <h2 className="font-semibold mb-2">Your review</h2>
              <StarRating rating={job.review.rating} size="sm" />
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{job.review.comment}</p>
              {job.review.reply && (
                <blockquote className="mt-3 border-l-2 pl-3 text-sm">
                  <span className="font-medium">Reply: </span>
                  {job.review.reply.body}
                </blockquote>
              )}
            </div>
          ) : (
            job.status === "COMPLETED" && (
              <ReviewForm
                jobId={job.id}
                tradespersonId={hired.tradesperson.id}
                tradespersonName={hired.tradesperson.companyName ?? hired.tradesperson.name}
                onSuccess={() => undefined}
              />
            )
          )}
        </div>
      )}

      {/* ── Responses ── */}
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Tradespeople ({engaged.length})
      </h2>
      {engaged.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="font-medium">No tradespeople have responded yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Most jobs get their first response within a day. We'll email you when someone is interested.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {engaged.map((r) => (
            <ResponseCard key={r.leadId} response={r} job={job} onAction={setConfirm} />
          ))}
        </div>
      )}

      {/* ── Confirmation ── */}
      <Dialog
        open={!!confirm}
        onOpenChange={(o) => {
          if (!o && !busy) {
            setConfirm(null);
            setDeclineReason("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{confirmCopy?.title}</DialogTitle>
            <DialogDescription>{confirmCopy?.body}</DialogDescription>
          </DialogHeader>
          {confirm?.kind === "decline" && (
            <div className="space-y-2">
              <Label htmlFor="decline-reason">Reason (optional, shared with the tradesperson)</Label>
              <Textarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                maxLength={300}
                rows={3}
              />
            </div>
          )}
          {confirm?.kind === "close" && (
            <RadioGroup value={closeReason} onValueChange={setCloseReason} className="gap-3">
              {CLOSE_REASONS.map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <RadioGroupItem id={`close-${r}`} value={r} />
                  <Label htmlFor={`close-${r}`} className="font-normal">
                    {r}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirm(null)} disabled={busy}>
              Cancel
            </Button>
            <Button
              variant={confirm?.kind === "close" || confirm?.kind === "decline" ? "destructive" : "default"}
              onClick={runConfirm}
              disabled={busy}
            >
              {busy ? "Working…" : confirmCopy?.cta}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeownerJobDetail;
