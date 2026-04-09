import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "@/api/auth";
import ForgotPasswordModal from "./ForgotPasswordModal";

const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
      onError: (err: unknown) => {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "Invalid email or password";
        toast({
          title: "Login failed",
          description: message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Login
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pb-4">
            <p className="text-center text-muted-foreground text-sm">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  {...register("email", {
                    setValueAs: (v: string) => v.toLowerCase(),
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <Link
                    to="#"
                    className="text-xs text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenChange(false);
                      setShowForgotPassword(true);
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Log in"
                )}
              </Button>
            </form>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-3">
                New to The Builder Network?
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <Link
                    to="/post-job"
                    className="text-primary hover:underline"
                    onClick={() => onOpenChange(false)}
                  >
                    Post your job
                  </Link>
                  <span className="text-muted-foreground">
                    {" "}
                    to find a tradesperson
                  </span>
                </div>
                <div>
                  <Link
                    to="/tradesnetwork"
                    className="text-primary hover:underline"
                    onClick={() => onOpenChange(false)}
                  >
                    Sign up
                  </Link>
                  <span className="text-muted-foreground">
                    {" "}
                    to join as a tradesperson
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onLoginClick={() => {
          setShowForgotPassword(false);
          onOpenChange(true);
        }}
      />
    </>
  );
};

export default LoginModal;
