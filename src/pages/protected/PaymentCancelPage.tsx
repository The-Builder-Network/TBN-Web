import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <>
      <Helmet>
        <title>Payment Cancelled | The Builder Network</title>
      </Helmet>

      <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center text-center pt-8 pb-8 gap-4">
            <XCircle className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Payment Cancelled</h1>
            <p className="text-muted-foreground">
              No charges were made. You can purchase credits at any time from
              your profile.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <Button asChild className="flex-1">
                <Link to="/tradesperson/profile?tab=balance">Buy credits</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/tradesperson/my-leads">Back to leads</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PaymentCancelPage;
