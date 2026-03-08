import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const ForgotPasswordModal = ({
  open,
  onOpenChange,
  onLoginClick,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      setSubmitted(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Reset Password
          </DialogTitle>
        </DialogHeader>

        <div className="pb-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-center text-muted-foreground text-sm">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
                disabled={!isValidEmail}
              >
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link
                  to="#"
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    onLoginClick();
                  }}
                >
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Check your inbox</h3>
                <p className="text-muted-foreground text-sm">
                  We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              <Alert className="bg-muted/50 border-none">
                <AlertDescription className="text-xs text-muted-foreground">
                  Didn't receive the email? Check your spam folder or try again.
                </AlertDescription>
              </Alert>

              <Button
                className="w-full"
                variant="outline"
                onClick={onLoginClick}
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
