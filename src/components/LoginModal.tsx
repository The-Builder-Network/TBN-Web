import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password <span className="text-destructive">*</span>
                </Label>
                <Link
                  to="#"
                  className="text-xs text-primary hover:underline"
                  onClick={() => onOpenChange(false)}
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
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
            Log in
          </Button>

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
  );
};

export default LoginModal;
