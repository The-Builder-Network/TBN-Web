import { useState } from "react";
import { CheckCircle, Coins } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateCheckout } from "@/api/payments";

// ── Credit pack data ───────────────────────────────────────────────────────

interface CreditPack {
  credits: number;
  pricePence: number;
  label: string;
  pricePerCredit: string;
  popular?: boolean;
}

const CREDIT_PACKS: CreditPack[] = [
  { credits: 25, pricePence: 2500, label: "Starter", pricePerCredit: "£1.00/credit" },
  { credits: 60, pricePence: 5000, label: "Standard", pricePerCredit: "£0.83/credit", popular: true },
  { credits: 150, pricePence: 10000, label: "Pro", pricePerCredit: "£0.67/credit" },
  { credits: 400, pricePence: 20000, label: "Enterprise", pricePerCredit: "£0.50/credit" },
];

function formatPrice(pence: number) {
  return `£${(pence / 100).toFixed(0)}`;
}

// ── Props ──────────────────────────────────────────────────────────────────

interface PurchaseCreditsModalProps {
  open: boolean;
  onClose: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────

export function PurchaseCreditsModal({ open, onClose }: PurchaseCreditsModalProps) {
  const [selected, setSelected] = useState<number>(60);
  const { mutate: checkout, isPending } = useCreateCheckout();

  function handleBuy() {
    checkout(selected);
    // onSuccess in useCreateCheckout redirects to Stripe — no need to close modal
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Coins className="h-5 w-5 text-amber-500" />
            Buy lead credits
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-4">
          Credits let you express interest in leads. Choose the pack that suits you.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {CREDIT_PACKS.map((pack) => (
            <button
              key={pack.credits}
              onClick={() => setSelected(pack.credits)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected === pack.credits
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-2.5 left-3 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <p className="font-semibold text-sm text-muted-foreground mb-1">{pack.label}</p>
              <p className="text-2xl font-bold mb-0.5">
                {pack.credits}{" "}
                <span className="text-base font-medium text-muted-foreground">credits</span>
              </p>
              <p className="text-base font-semibold">{formatPrice(pack.pricePence)}</p>
              <p className="text-xs text-muted-foreground mt-1">{pack.pricePerCredit}</p>
              {selected === pack.credits && (
                <CheckCircle className="absolute top-3 right-3 h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button className="flex-1 gap-2" onClick={handleBuy} disabled={isPending}>
            {isPending ? (
              "Redirecting…"
            ) : (
              <>
                <Coins className="h-4 w-4" />
                Buy now — {formatPrice(CREDIT_PACKS.find((p) => p.credits === selected)!.pricePence)}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Secure payment via Stripe. Credits are added instantly after payment.
        </p>
      </DialogContent>
    </Dialog>
  );
}
