import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "boneyard-js/react";
import { useBalance } from "@/api/payments";

const PaymentSuccessPage = () => {
  const { data: balance, isLoading } = useBalance();

  return (
    <>
      <Helmet>
        <title>Payment Successful | The Builder Network</title>
      </Helmet>

      <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center text-center pt-8 pb-8 gap-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your credits have been added to your account.
            </p>

            <Skeleton name="payment-balance" loading={isLoading}>
              {balance !== undefined && (
                <div className="bg-muted rounded-lg px-6 py-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Current balance
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {balance.balance}
                  </p>
                  <p className="text-sm text-muted-foreground">credits</p>
                </div>
              )}
            </Skeleton>

            <Button asChild className="mt-2 w-full">
              <Link to="/tradesperson/profile?tab=balance">
                View my credits
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
