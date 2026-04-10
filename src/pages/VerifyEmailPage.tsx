import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/api/auth";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending, isSuccess, isError } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Verify Email | The Builder Network</title>
        <meta
          name="description"
          content="Verify your email address to complete your Builder Network account setup."
        />
      </Helmet>

      <div className="flex flex-1 items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Email verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* No token in URL */}
            {!token && (
              <>
                <XCircle className="mx-auto h-16 w-16 text-destructive" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">
                    Invalid verification link
                  </p>
                  <p className="text-muted-foreground text-sm">
                    This verification link is missing required information.
                    Please use the link sent to your email address.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/">Go to homepage</Link>
                </Button>
              </>
            )}

            {/* Verifying */}
            {token && isPending && (
              <>
                <Loader2 className="mx-auto h-16 w-16 text-primary animate-spin" />
                <p className="text-muted-foreground">Verifying your email…</p>
              </>
            )}

            {/* Success */}
            {token && isSuccess && (
              <>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Email verified!</p>
                  <p className="text-muted-foreground text-sm">
                    Your email has been verified. You can now log in to your
                    account.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/">Go to homepage</Link>
                </Button>
              </>
            )}

            {/* Error */}
            {token && isError && (
              <>
                <XCircle className="mx-auto h-16 w-16 text-destructive" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Verification failed</p>
                  <p className="text-muted-foreground text-sm">
                    This link has expired or is invalid. Please request a new
                    verification email by logging in or registering again.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/">Go to homepage</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VerifyEmailPage;
