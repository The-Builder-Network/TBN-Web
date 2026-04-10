import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/api/auth";

const schema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate, isPending, isSuccess, isError } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    if (!token) return;
    mutate({ token, newPassword: values.newPassword });
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | The Builder Network</title>
        <meta
          name="description"
          content="Set a new password for your Builder Network account."
        />
      </Helmet>

      <div className="flex flex-1 items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Reset your password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* No token */}
            {!token && (
              <div className="text-center space-y-4">
                <XCircle className="mx-auto h-16 w-16 text-destructive" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Invalid reset link</p>
                  <p className="text-muted-foreground text-sm">
                    This password reset link is missing required information.
                    Please use the link sent to your email address.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/">Go to homepage</Link>
                </Button>
              </div>
            )}

            {/* Success state */}
            {token && isSuccess && (
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">
                    Password reset successfully!
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Your password has been updated. You can now log in with your
                    new password.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/">Go to homepage</Link>
                </Button>
              </div>
            )}

            {/* Error state */}
            {token && isError && !isSuccess && (
              <div className="text-center space-y-4">
                <XCircle className="mx-auto h-16 w-16 text-destructive" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Link expired</p>
                  <p className="text-muted-foreground text-sm">
                    This link has expired. Please request a new password reset.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/">Go to homepage</Link>
                </Button>
              </div>
            )}

            {/* Form */}
            {token && !isSuccess && !isError && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <p className="text-muted-foreground text-sm text-center">
                  Enter a new password for your account.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      {...register("newPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-sm text-destructive">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your new password"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Resetting…" : "Reset password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordPage;
