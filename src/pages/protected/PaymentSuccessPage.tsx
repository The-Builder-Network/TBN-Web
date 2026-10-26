import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfirmCheckout } from "@/api/payments";

const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { data, isLoading, isError } = useConfirmCheckout(sessionId);

  const pending = isLoading || data?.status === "PENDING";
  const ok = data?.status === "COMPLETED";

  return (
    <>
      <Helmet>
        <title>Payment | The Builder Network</title>
      </Helmet>

      <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center text-center pt-8 pb-8 gap-4" aria-live="polite">
            {!sessionId || isError || (data && !ok && !pending) ? (
              <>
                <AlertCircle className="h-16 w-16 text-destructive" />
                <h1 className="text-2xl font-bold">We couldn't confirm your payment</h1>
                <p className="text-muted-foreground">
                  If you were charged, your credits will appear shortly. Otherwise contact
                  support@thebuildernetwork.com.
                </p>
              </>
            ) : pending ? (
              <>
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Confirming your payment…</h1>
                <p className="text-muted-foreground">This usually takes a few seconds.</p>
              </>
            ) : (
              <>
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h1 className="text-2xl font-bold">Payment successful</h1>
                <p className="text-muted-foreground">
                  {data?.credits} credits have been added to your account.
                </p>
                <div className="bg-muted rounded-lg px-6 py-3 text-center">
                  <p className="text-sm text-muted-foreground">Available balance</p>
                  <p className="text-3xl font-bold text-primary">{data?.balance}</p>
                  <p className="text-sm text-muted-foreground">credits</p>
                </div>
              </>
            )}

            <Button asChild className="mt-2 w-full">
              <Link to="/tradesperson/profile?tab=balance">View my credits</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
