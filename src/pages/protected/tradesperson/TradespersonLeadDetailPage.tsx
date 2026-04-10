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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "boneyard-js/react";
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

const LeadDetail = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
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
    expressInterestMutation.mutate(
      { leadId, message: message.trim() },
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
          // Check for insufficient credits error
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

  if (!isLoading && (error || !lead)) {
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

  return (
    <Skeleton name="lead-detail" loading={isLoading}>
      <div className="container py-10 max-w-3xl">
        <Helmet>
          <title>{lead.job.title} — Lead Detail | The Builder Network</title>
          <meta
            name="description"
            content={`Lead details for: ${lead.job.title}. Express interest and contact the homeowner.`}
          />
        </Helmet>
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/tradesperson/my-leads">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Leads
          </Link>
        </Button>

        {/* ── Job Details Card ── */}
        <div className="border rounded-lg p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <Badge variant="outline" className="capitalize text-xs">
              {lead.job.serviceSlug.replace(/-/g, " ")}
            </Badge>
            {lead.job.tradeSlug && (
              <Badge variant="secondary" className="capitalize text-xs">
                {lead.job.tradeSlug.replace(/-/g, " ")}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold mb-3">{lead.job.title}</h1>

          {lead.job.description && (
            <p className="text-muted-foreground mb-4">{lead.job.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            {lead.job.placeName && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {lead.job.placeName} ({lead.job.postcode})
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Posted {formatDate(lead.job.createdAt)}
            </span>
            {lead.distanceMiles !== undefined && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {Math.round(lead.distanceMiles)} miles away
              </span>
            )}
          </div>

          {/* Attachments */}
          {lead.job.attachments && lead.job.attachments.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Attachments</p>
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

        {/* ── Credit Cost & Balance ── */}
        <div className="border rounded-lg p-5 mb-4 flex items-center justify-between gap-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <Coins className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm text-muted-foreground">Lead cost</p>
              <p className="text-lg font-bold">
                {creditCost} credit{creditCost !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Your balance</p>
              <p
                className={`text-lg font-bold ${!hasEnoughCredits ? "text-destructive" : ""}`}
              >
                {balance} credit{balance !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {!hasEnoughCredits && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowPurchaseModal(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              Buy credits
            </Button>
          )}
        </div>

        {/* ── Express Interest / Status ── */}
        {alreadyInterested ? (
          <div className="border rounded-lg p-6 bg-green-50 dark:bg-green-950/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-semibold text-green-700 dark:text-green-400">
                You've already expressed interest
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Status:{" "}
              <span className="font-medium capitalize">
                {lead.status.toLowerCase()}
              </span>
            </p>
            {lead.quote && (
              <div className="border rounded p-4 bg-card mb-4">
                <p className="text-sm font-medium mb-1">Your message</p>
                <p className="text-sm text-muted-foreground">
                  {lead.quote.message}
                </p>
                {lead.quote.amountPence && (
                  <p className="text-sm mt-1">
                    Quote:{" "}
                    <strong>{formatPence(lead.quote.amountPence)}</strong>
                  </p>
                )}
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => navigate("/tradesperson/contacts")}
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Go to conversations
            </Button>
          </div>
        ) : (
          <div className="border rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-1">Express Interest</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Write a message to the homeowner explaining why you're the right
              person for the job. This will cost{" "}
              <strong>
                {creditCost} credit{creditCost !== 1 ? "s" : ""}
              </strong>
              .
            </p>

            <Textarea
              placeholder="Hi, I've seen your job and I'd be delighted to help. I have X years of experience in..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="mb-4"
              maxLength={2000}
            />

            {/* Insufficient credits inline CTA */}
            {!hasEnoughCredits && (
              <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-destructive text-sm">
                    Insufficient credits
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    You need {creditCost} credit{creditCost !== 1 ? "s" : ""}{" "}
                    but only have {balance}. Top up to express interest in this
                    lead.
                  </p>
                </div>
                <Button
                  size="sm"
                  className="shrink-0 gap-2"
                  onClick={() => setShowPurchaseModal(true)}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Buy credits
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                {message.length}/2000 characters
              </p>
              <Button
                onClick={handleExpressInterest}
                disabled={
                  !message.trim() ||
                  !hasEnoughCredits ||
                  expressInterestMutation.isPending
                }
                className="gap-2"
              >
                {expressInterestMutation.isPending ? (
                  "Expressing interest..."
                ) : !hasEnoughCredits ? (
                  "Insufficient credits"
                ) : (
                  <>
                    <Coins className="h-4 w-4" />
                    Express interest ({creditCost} credits)
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
    </Skeleton>
  );
};

export default LeadDetail;
