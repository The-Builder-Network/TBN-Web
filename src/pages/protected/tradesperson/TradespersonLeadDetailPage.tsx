import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  AlertCircle,
  MapPin,
  Calendar,
  Coins,
  Wallet,
  CheckCircle,
  MessageSquare,
  ShoppingCart,
  Clock,
  Paperclip,
  PoundSterling,
  Phone,
  Mail,
  User,
  Star,
  Undo2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useLead,
  useExpressInterest,
  useWithdrawInterest,
  useDismissLead,
  useUpsertQuote,
  useRequestReview,
  useCreditRequest,
} from "@/api/leads";
import { useBalance } from "@/api/payments";
import { useToast } from "@/hooks/use-toast";
import { extractError } from "@/api/client";
import { PurchaseCreditsModal } from "@/components/payments/PurchaseCreditsModal";
import type { CreditRequestReason, LeadDetail as Lead } from "@/api/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPence(pence?: number | null) {
  if (!pence) return null;
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
}

function timeLeft(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${hours}h left to respond`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} left to respond`;
}

const toPence = (pounds: string) => (pounds ? Math.round(parseFloat(pounds) * 100) : undefined);

const CREDIT_REASONS: { value: CreditRequestReason; label: string }[] = [
  { value: "CUSTOMER_UNREACHABLE", label: "I couldn't reach the customer (after 7 days)" },
  { value: "WRONG_WORK_TYPE", label: "The job isn't the type of work described" },
  { value: "NOT_A_REAL_JOB", label: "The job isn't genuine" },
  { value: "DUPLICATE_SHORTLIST", label: "I was shortlisted twice for the same job" },
  { value: "OTHER", label: "Something else" },
];

/** Where the lead is in its life, from the tradesperson's side. */
function StatusPanel({ lead }: { lead: Lead }) {
  const name = lead.homeowner.firstName;
  const panels: Record<string, { tone: string; title: string; body: string }> = {
    INTERESTED: {
      tone: "border-blue-200 bg-blue-50 text-blue-900",
      title: `Waiting for ${name} to respond`,
      body: `We're holding ${lead.creditsReserved} credits. You're only charged if ${name} shortlists you — otherwise they're returned.`,
    },
    SHORTLISTED: {
      tone: "border-green-200 bg-green-50 text-green-900",
      title: `${name} shortlisted you`,
      body: "Get in touch to discuss the job and arrange a visit or quote.",
    },
    HIRED: {
      tone: "border-green-200 bg-green-50 text-green-900",
      title: `${name} hired you`,
      body: "Once the work is done, ask for a review — it helps you win more work.",
    },
    DECLINED: {
      tone: "border-muted bg-muted/40",
      title: `${name} decided not to go ahead with you`,
      body: "Your held credits have been returned to your balance.",
    },
    NOT_SELECTED: {
      tone: "border-muted bg-muted/40",
      title: "The customer went with someone else",
      body: lead.creditsCharged
        ? "The job has been filled or closed."
        : "The job has been filled or closed. Your held credits have been returned.",
    },
    WITHDRAWN: {
      tone: "border-muted bg-muted/40",
      title: "You withdrew your interest",
      body: "Your held credits have been returned to your balance.",
    },
    EXPIRED: {
      tone: "border-muted bg-muted/40",
      title: "This lead has expired",
      body: "Any held credits have been returned. Check your leads for new opportunities.",
    },
  };
  const p = panels[lead.status];
  if (!p) return null;
  return (
    <div className={`border rounded-xl p-5 mb-5 ${p.tone}`}>
      <p className="font-semibold">{p.title}</p>
      <p className="text-sm mt-1 opacity-90">{p.body}</p>
    </div>
  );
}

const LeadDetail = () => {
  const { leadId = "" } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quotePounds, setQuotePounds] = useState("");
  const [creditOpen, setCreditOpen] = useState(false);
  const [creditReason, setCreditReason] = useState<CreditRequestReason>("CUSTOMER_UNREACHABLE");
  const [creditDetails, setCreditDetails] = useState("");

  const { data: lead, isLoading, error } = useLead(leadId);
  const { data: balanceInfo } = useBalance();
  const expressInterest = useExpressInterest();
  const withdraw = useWithdrawInterest();
  const dismiss = useDismissLead();
  const upsertQuote = useUpsertQuote();
  const requestReview = useRequestReview();
  const creditRequest = useCreditRequest();

  const balance = balanceInfo?.balance ?? 0;
  const creditCost = lead?.creditCost ?? 0;
  const hasEnoughCredits = balance >= creditCost;

  const fail = (title: string) => (err: unknown) =>
    toast({ title, description: extractError(err), variant: "destructive" });

  function handleExpressInterest() {
    if (message.trim().length < 10) return;
    expressInterest.mutate(
      { leadId, message: message.trim(), quoteAmountPence: toPence(quoteAmount) },
      {
        onSuccess: () =>
          toast({
            title: "Interest sent",
            description: `${creditCost} credits are on hold. You're only charged if the customer shortlists you.`,
          }),
        onError: (err) => {
          if (axios.isAxiosError(err) && err.response?.status === 402) {
            setShowPurchaseModal(true);
            toast({ title: "Not enough credits", description: extractError(err), variant: "destructive" });
            return;
          }
          fail("Could not send interest")(err);
        },
      },
    );
  }

  if (isLoading) {
    return (
      <div className="container py-10 max-w-3xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="container py-10 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/tradesperson/my-leads">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Leads
          </Link>
        </Button>
        <div className="border rounded-lg p-12 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
          <p className="font-semibold text-lg mb-2">Lead not found</p>
          <p className="text-muted-foreground mb-6">
            This lead doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => navigate("/tradesperson/my-leads")}>Back to My Leads</Button>
        </div>
      </div>
    );
  }

  const shortlisted = lead.status === "SHORTLISTED" || lead.status === "HIRED";
  const engaged = lead.status === "INTERESTED" || shortlisted;
  const location = lead.job.placeName ?? lead.job.postcodeDistrict;
  const canRequestCredit =
    lead.creditsCharged > 0 && !lead.creditRequest && ["SHORTLISTED", "HIRED", "NOT_SELECTED"].includes(lead.status);

  return (
    <div className="container py-10 max-w-3xl">
      <Helmet>
        <title>{lead.job.title} — Lead | The Builder Network</title>
      </Helmet>

      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link to="/tradesperson/my-leads">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to leads
        </Link>
      </Button>

      {/* ── Header ── */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline" className="capitalize text-xs">
            {lead.job.serviceSlug.replace(/-/g, " ")}
          </Badge>
          {lead.invited && <Badge className="bg-highlight text-white text-xs">Invited by customer</Badge>}
          {lead.status === "AVAILABLE" && lead.expiresAt && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {timeLeft(lead.expiresAt)}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{lead.job.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">Job #{lead.job.jobNumber}</p>
      </div>

      <StatusPanel lead={lead} />

      {/* ── Customer contact (after shortlist) ── */}
      {shortlisted && (
        <div className="border rounded-xl p-5 mb-5">
          <h2 className="font-semibold mb-3">Customer details</h2>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              {lead.homeowner.name}
            </span>
            {lead.job.postcode && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {lead.job.postcode}
              </span>
            )}
            {lead.homeowner.phone && (
              <a href={`tel:${lead.homeowner.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="h-4 w-4" />
                {lead.homeowner.phone}
              </a>
            )}
            {lead.homeowner.email && (
              <a href={`mailto:${lead.homeowner.email}`} className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                {lead.homeowner.email}
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {lead.conversationId && (
              <Button asChild size="sm">
                <Link to={`/tradesperson/contacts?conversationId=${lead.conversationId}`}>
                  <MessageSquare className="mr-1.5 h-4 w-4" />
                  Message {lead.homeowner.firstName}
                </Link>
              </Button>
            )}
            {lead.status === "HIRED" && !lead.review && (
              <Button
                size="sm"
                variant="outline"
                disabled={requestReview.isPending}
                onClick={() =>
                  requestReview.mutate(
                    { leadId },
                    {
                      onSuccess: () => toast({ title: "Review request sent" }),
                      onError: fail("Could not request a review"),
                    },
                  )
                }
              >
                <Star className="mr-1.5 h-4 w-4" />
                Ask for a review
              </Button>
            )}
          </div>
          {lead.review && (
            <p className="mt-3 text-sm text-muted-foreground">
              {lead.homeowner.firstName} left you a {lead.review.rating}-star review.
            </p>
          )}
        </div>
      )}

      {/* ── Job Info ── */}
      <div className="border rounded-xl divide-y mb-5">
        <div className="px-5 py-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" />
              {location}
              {lead.distanceMiles != null &&
                ` · ${Math.round(lead.distanceMiles)} mile${Math.round(lead.distanceMiles) === 1 ? "" : "s"} from you`}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 shrink-0" />
            {lead.homeowner.firstName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 shrink-0" />
            Posted {formatDate(lead.job.createdAt)}
          </span>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Job description</p>
          <p className="text-base whitespace-pre-line">{lead.job.description}</p>
        </div>

        {lead.job.answers.length > 0 && (
          <dl className="px-5 py-4 grid gap-3 sm:grid-cols-2">
            {lead.job.answers.map((a, i) => (
              <div key={i}>
                <dt className="text-xs text-muted-foreground">{a.question}</dt>
                <dd className="text-sm font-medium">{a.answer}</dd>
              </div>
            ))}
          </dl>
        )}

        {lead.job.attachments.length > 0 && (
          <div className="px-5 py-4">
            <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5" />
              Photos &amp; files
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {lead.job.attachments.map((att) => (
                <a
                  key={att.id}
                  href={att.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square overflow-hidden rounded-md border text-xs"
                >
                  {att.mimeType.startsWith("image/") ? (
                    <img src={att.fileUrl} alt={att.fileName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full items-center justify-center p-2 text-center break-all">
                      {att.fileName}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Your response (interest message + quote) ── */}
      {engaged && (
        <div className="border rounded-xl p-5 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Your response</h2>
            {lead.job.status === "ACTIVE" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setQuoteMessage(lead.quote?.message ?? lead.interestMessage ?? "");
                  setQuotePounds(lead.quote?.amountPence ? String(lead.quote.amountPence / 100) : "");
                  setQuoteOpen(true);
                }}
              >
                <PoundSterling className="mr-1.5 h-3.5 w-3.5" />
                {lead.quote ? "Update quote" : "Add a quote"}
              </Button>
            )}
          </div>
          {lead.interestMessage && (
            <p className="text-sm text-muted-foreground whitespace-pre-line">{lead.interestMessage}</p>
          )}
          {lead.quote && lead.quote.status !== "WITHDRAWN" && (
            <p className="text-sm">
              Quote:{" "}
              <span className="font-semibold">
                {formatPence(lead.quote.amountPence) ?? lead.quote.estimateRange ?? "No price given"}
              </span>
            </p>
          )}
          {lead.status === "INTERESTED" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground -ml-2"
              disabled={withdraw.isPending}
              onClick={() =>
                withdraw.mutate(
                  { leadId },
                  {
                    onSuccess: () => toast({ title: "Interest withdrawn", description: "Your held credits were returned." }),
                    onError: fail("Could not withdraw"),
                  },
                )
              }
            >
              <Undo2 className="mr-1.5 h-4 w-4" />
              Withdraw interest
            </Button>
          )}
        </div>
      )}

      {/* ── Credit request ── */}
      {lead.creditRequest && (
        <div className="border rounded-xl p-5 mb-5 text-sm">
          <p className="font-semibold">
            Credit request{" "}
            {lead.creditRequest.status === "PENDING"
              ? "under review"
              : lead.creditRequest.status === "APPROVED"
                ? "approved — credits returned"
                : "not approved"}
          </p>
          {lead.creditRequest.adminNote && (
            <p className="text-muted-foreground mt-1">{lead.creditRequest.adminNote}</p>
          )}
        </div>
      )}
      {canRequestCredit && (
        <p className="text-sm text-muted-foreground mb-5">
          Problem with this lead?{" "}
          <button type="button" className="text-primary underline" onClick={() => setCreditOpen(true)}>
            Request your credits back
          </button>
        </p>
      )}

      {/* ── Express interest ── */}
      {lead.status === "AVAILABLE" && (
        <>
          <div className="border rounded-xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4 bg-amber-50 border-amber-200">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Lead fee if shortlisted</p>
                  <p className="font-bold">{creditCost} credits</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Available balance</p>
                  <p className={`font-bold ${!hasEnoughCredits ? "text-destructive" : ""}`}>{balance} credits</p>
                </div>
              </div>
            </div>
            {!hasEnoughCredits && (
              <Button size="sm" className="gap-2" onClick={() => setShowPurchaseModal(true)}>
                <ShoppingCart className="h-4 w-4" />
                Buy credits
              </Button>
            )}
          </div>

          {lead.verificationRequired ? (
            <div className="border rounded-xl p-6 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-primary mb-3" />
              <p className="font-semibold mb-1">Get verified to respond to leads</p>
              <p className="text-sm text-muted-foreground mb-4">
                We check every tradesperson's ID before they can contact customers.
              </p>
              <Button asChild>
                <Link to="/tradesperson/profile?tab=verification">Go to verification</Link>
              </Button>
            </div>
          ) : !lead.canExpressInterest ? (
            <div className="border rounded-xl p-6 text-center">
              <Clock className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-semibold mb-1">This job is no longer taking responses</p>
              <Button variant="outline" className="mt-3" onClick={() => navigate("/tradesperson/my-leads")}>
                Browse new leads
              </Button>
            </div>
          ) : (
            <div className="border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-1">I'm interested</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Tell {lead.homeowner.firstName} why you're right for the job. We'll hold{" "}
                <strong>{creditCost} credits</strong> — you're only charged if they shortlist you and
                you swap contact details. If they don't, the credits come back.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="intro" className="mb-1.5 block">
                    Your message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="intro"
                    placeholder="Hi, I've read your job description and I'd be happy to help. I have X years of experience in..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.trim().length < 10 ? "At least 10 characters · " : ""}
                    {message.length}/2000
                  </p>
                </div>

                <div>
                  <Label htmlFor="quote" className="mb-1.5 block text-sm">
                    Rough price <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <div className="relative w-48">
                    <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="quote"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-between gap-3">
                <Button
                  variant="ghost"
                  className="text-muted-foreground"
                  disabled={dismiss.isPending}
                  onClick={() =>
                    dismiss.mutate(
                      { leadId },
                      {
                        onSuccess: () => navigate("/tradesperson/my-leads"),
                        onError: fail("Could not dismiss lead"),
                      },
                    )
                  }
                >
                  Not interested
                </Button>
                <Button
                  onClick={handleExpressInterest}
                  disabled={message.trim().length < 10 || !hasEnoughCredits || expressInterest.isPending}
                  className="gap-2 px-6"
                >
                  {expressInterest.isPending ? (
                    "Sending…"
                  ) : !hasEnoughCredits ? (
                    "Not enough credits"
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Send interest
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Quote dialog ── */}
      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{lead.quote ? "Update your quote" : "Send a quote"}</DialogTitle>
            <DialogDescription>{lead.homeowner.firstName} will see this on their job page.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="q-msg">What's included</Label>
            <Textarea id="q-msg" rows={4} maxLength={2000} value={quoteMessage} onChange={(e) => setQuoteMessage(e.target.value)} />
            <Label htmlFor="q-amt">Price (£)</Label>
            <Input id="q-amt" type="number" min="1" step="0.01" value={quotePounds} onChange={(e) => setQuotePounds(e.target.value)} />
          </div>
          <DialogFooter>
            <Button
              disabled={quoteMessage.trim().length < 5 || upsertQuote.isPending}
              onClick={() =>
                upsertQuote.mutate(
                  { leadId, message: quoteMessage.trim(), amountPence: toPence(quotePounds) },
                  {
                    onSuccess: () => {
                      setQuoteOpen(false);
                      toast({ title: "Quote saved" });
                    },
                    onError: fail("Could not save quote"),
                  },
                )
              }
            >
              {upsertQuote.isPending ? "Saving…" : "Save quote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Credit request dialog ── */}
      <Dialog open={creditOpen} onOpenChange={setCreditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request your credits back</DialogTitle>
            <DialogDescription>
              Our team reviews every request, usually within 2 working days. Requests must be made within 20 days of being shortlisted.
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={creditReason} onValueChange={(v) => setCreditReason(v as CreditRequestReason)} className="gap-3">
            {CREDIT_REASONS.map((r) => (
              <div key={r.value} className="flex items-center gap-2">
                <RadioGroupItem id={`cr-${r.value}`} value={r.value} />
                <Label htmlFor={`cr-${r.value}`} className="font-normal">{r.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <Label htmlFor="cr-details">Details</Label>
          <Textarea
            id="cr-details"
            rows={4}
            maxLength={2000}
            value={creditDetails}
            onChange={(e) => setCreditDetails(e.target.value)}
            placeholder="What happened? Include when you tried to contact the customer."
          />
          <DialogFooter>
            <Button
              disabled={creditDetails.trim().length < 10 || creditRequest.isPending}
              onClick={() =>
                creditRequest.mutate(
                  { leadId, reason: creditReason, details: creditDetails.trim() },
                  {
                    onSuccess: () => {
                      setCreditOpen(false);
                      toast({ title: "Request sent", description: "We'll email you when it's been reviewed." });
                    },
                    onError: fail("Could not send request"),
                  },
                )
              }
            >
              {creditRequest.isPending ? "Sending…" : "Send request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PurchaseCreditsModal open={showPurchaseModal} onClose={() => setShowPurchaseModal(false)} />
    </div>
  );
};

export default LeadDetail;
