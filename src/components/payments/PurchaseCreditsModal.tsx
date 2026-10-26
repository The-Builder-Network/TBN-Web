import { useState } from "react";
import { AlertCircle, CheckCircle, Coins } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateCheckout, usePacks } from "@/api/payments";
import { extractError } from "@/api/client";

function formatPrice(pence: number) {
  return `£${(pence / 100).toFixed(0)}`;
}

interface PurchaseCreditsModalProps {
  open: boolean;
  onClose: () => void;
}

export function PurchaseCreditsModal({ open, onClose }: PurchaseCreditsModalProps) {
  const { data: packs = [], isLoading, error: packsError } = usePacks();
  const [selected, setSelected] = useState<number | null>(null);
  const checkout = useCreateCheckout();

  const chosen = packs.find((p) => p.credits === selected) ?? packs.find((p) => p.popular) ?? packs[0];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          checkout.reset();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Coins className="h-5 w-5 text-amber-500" />
            Buy lead credits
          </DialogTitle>
          <DialogDescription>
            Credits pay the lead fee when a customer shortlists you. Credits don't expire.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 mb-6" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : packsError ? (
          <p className="text-sm text-destructive mb-4">Couldn't load credit packs. Please try again.</p>
        ) : (
          <div role="radiogroup" aria-label="Credit pack" className="grid grid-cols-2 gap-3 mb-6">
            {packs.map((pack) => {
              const active = chosen?.credits === pack.credits;
              return (
                <button
                  key={pack.credits}
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelected(pack.credits)}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-2.5 left-3 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <p className="font-semibold text-sm text-muted-foreground mb-1">{pack.label}</p>
                  <p className="text-2xl font-bold mb-0.5">
                    {pack.credits} <span className="text-base font-medium text-muted-foreground">credits</span>
                  </p>
                  <p className="text-base font-semibold">{formatPrice(pack.amountPence)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{pack.pricePerCredit} per credit</p>
                  {active && <CheckCircle className="absolute top-3 right-3 h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        )}

        {checkout.isError && (
          <p role="alert" className="mb-4 flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            {extractError(checkout.error)}
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={checkout.isPending}>
            Cancel
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={() => chosen && checkout.mutate(chosen.credits)}
            disabled={!chosen || checkout.isPending}
          >
            {checkout.isPending ? (
              "Redirecting to payment…"
            ) : (
              <>
                <Coins className="h-4 w-4" />
                Buy now{chosen ? ` — ${formatPrice(chosen.amountPence)}` : ""}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Secure payment by Stripe. Credits are added as soon as payment is confirmed.
        </p>
      </DialogContent>
    </Dialog>
  );
}
