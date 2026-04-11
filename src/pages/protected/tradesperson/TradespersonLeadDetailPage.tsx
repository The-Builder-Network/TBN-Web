import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLead, useExpressInterest } from "@/api/leads";
import { useBalance } from "@/api/payments";
import { useToast } from "@/hooks/use-toast";
import { extractError } from "@/api/client";
import { PurchaseCreditsModal } from "@/components/payments/PurchaseCreditsModal";

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

function timeLeft(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${hours}h remaining`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} remaining`;
}

const LeadDetail = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const { data: lead, isLoading, error } = useLead(leadId!);
  const { data: balanceInfo } = useBalance();
  const expressInterestMutation = useExpressInterest();

  const balance = balanceInfo?.balance ?? 0;
  const creditCost = lead?.creditCost ?? 0;
  const hasEnoughCredits = balance >= creditCost;
  const alreadyInterested = lead?.status !== "AVAILABLE";

  function handleExpressInterest() {
    if (!leadId || !message.trim()) return;
    const amountPence = quoteAmount
      ? Math.round(parseFloat(quoteAmount) * 100)
      : undefined;
    expressInterestMutation.mutate(
      { leadId, message: message.trim(), quoteAmountPence: amountPence },
      {
        onSuccess: () => {
          toast({
            title: "Interest expressed!",
            description: `${creditCost} credit${creditCost !== 1 ? "s" : ""} deducted. The homeowner has been notified.`,
          });
          navigate("/tradesperson/contacts");
        },
        onError: (err) => {
          const msg = extractError(err);
          try {
            const payload = JSON.parse(msg);
            if (payload.error === "INSUFFICIENT_CREDITS") {
              toast({
                title: "Insufficient credits",
                description: `You need ${payload.required} credits but only have ${payload.balance}. Please top up.`,
                variant: "destructive",
              });
              return;
            }
          } catch {
            // not a JSON payload
          }
          toast({
            title: "Failed to express interest",
            description: msg,
            variant: "destructive",
          });
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
          <Button onClick={() => navigate("/tradesperson/my-leads")}>
            Back to My Leads
          </Button>
        </div>
      </div>
    );
  }

  const expiresLabel = lead.expiresAt ? timeLeft(lead.expiresAt) : null;
  const isExpired = lead.expiresAt
    ? new Date(lead.expiresAt).getTime() < Date.now()
    : false;

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
          {alreadyInterested && (
            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
              Interested
            </Badge>
          )}
          {isExpired && (
            <Badge variant="destructive" className="text-xs">
              Expired
            </Badge>
          )}
          {expiresLabel && !isExpired && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {expiresLabel}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{lead.job.title}</h1>
      </div>

      {/* ── Job Info ── */}
      <div className="border rounded-xl divide-y mb-5">
        {/* Location & date row */}
        <div className="px-5 py-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
          {lead.job.placeName && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {lead.job.placeName}
                {alreadyInterested
                  ? ` (${lead.job.postcode})`
                  : ` · ${lead.job.postcode.slice(0, lead.job.postcode.length - 2)}**`}
              </span>
            </span>
          )}
          {lead.distanceMiles !== undefined && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" />
              {Math.round(lead.distanceMiles)} miles from you
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 shrink-0" />
            Posted {formatDate(lead.job.createdAt)}
          </span>
        </div>

        {/* Description */}
        {lead.job.description && (
          <div className="px-5 py-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Job description
            </p>
            <p className="text-base">{lead.job.description}</p>
          </div>
        )}

        {/* Attachments */}
        {lead.job.attachments && lead.job.attachments.length > 0 && (
          <div className="px-5 py-4">
            <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5" />
              Attachments
            </p>
            <div className="flex flex-wrap gap-2">
              {lead.job.attachments.map((att, i) => (
                <a
                  key={i}
                  href={att.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline hover:no-underline"
                >
                  {att.fileName}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Credits bar ── */}
      <div className="border rounded-xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">Introduction cost</p>
              <p className="font-bold">
                {creditCost} credit{creditCost !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Your balance</p>
              <p
                className={`font-bold ${!hasEnoughCredits ? "text-destructive" : ""}`}
              >
                {balance} credit{balance !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
        {!hasEnoughCredits && !alreadyInterested && (
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setShowPurchaseModal(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            Buy credits
          </Button>
        )}
      </div>

      {/* ── Action panel ── */}
      {alreadyInterested ? (
        <div className="border rounded-xl p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="font-semibold text-green-700 dark:text-green-400">
              You've already sent an introduction
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Status:{" "}
            <span className="font-medium capitalize">
              {lead.status.toLowerCase()}
            </span>
          </p>
          {lead.quote && (
            <div className="border rounded-lg p-4 bg-card mb-4 space-y-1">
              <p className="text-sm font-medium">Your message</p>
              <p className="text-sm text-muted-foreground">
                {lead.quote.message}
              </p>
              {lead.quote.amountPence && (
                <p className="text-sm font-medium mt-2">
                  Your quote:{" "}
                  <span className="text-foreground">
                    {formatPence(lead.quote.amountPence)}
                  </span>
                </p>
              )}
            </div>
          )}
          <Button
            onClick={() => navigate("/tradesperson/contacts")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Go to conversations
          </Button>
        </div>
      ) : isExpired ? (
        <div className="border rounded-xl p-6 text-center">
          <Clock className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="font-semibold mb-1">This lead has expired</p>
          <p className="text-sm text-muted-foreground mb-4">
            Leads expire after 7 days. Check your leads list for new
            opportunities.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/tradesperson/my-leads")}
          >
            Browse new leads
          </Button>
        </div>
      ) : (
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-1">Send an introduction</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Introduce yourself and explain why you're the right person for this
            job. The homeowner will see your message and can choose to get in
            touch. This costs{" "}
            <strong>
              {creditCost} credit{creditCost !== 1 ? "s" : ""}
            </strong>
            .
          </p>

          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block">
                Your introduction <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="Hi, I've read your job description and I'd be happy to help. I have X years of experience in..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {message.length}/2000
              </p>
            </div>

            <div>
              <Label className="mb-1.5 block text-sm">
                Quote amount{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <div className="relative w-48">
                <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Insufficient credits CTA */}
          {!hasEnoughCredits && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-destructive text-sm">
                  Insufficient credits
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You need {creditCost} credit{creditCost !== 1 ? "s" : ""} but
                  only have {balance}. Top up to send your introduction.
                </p>
              </div>
              <Button
                size="sm"
                className="shrink-0 gap-1.5"
                onClick={() => setShowPurchaseModal(true)}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Buy credits
              </Button>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <Button
              onClick={handleExpressInterest}
              disabled={
                !message.trim() ||
                !hasEnoughCredits ||
                expressInterestMutation.isPending
              }
              className="gap-2 px-6"
            >
              {expressInterestMutation.isPending ? (
                "Sending…"
              ) : !hasEnoughCredits ? (
                "Insufficient credits"
              ) : (
                <>
                  <Coins className="h-4 w-4" />
                  Send introduction · {creditCost} credit
                  {creditCost !== 1 ? "s" : ""}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <PurchaseCreditsModal
        open={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </div>
  );
};

export default LeadDetail;
