import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PasswordField from "@/components/shared/PasswordField";
import { useChangePassword } from "@/api/auth";
import { useDeleteAccount, useSetNotificationsPaused } from "@/api/users";
import { extractError } from "@/api/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

function ChangePasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { toast } = useToast();
  const change = useChangePassword();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const mismatch = confirm.length > 0 && next !== confirm;
  const valid = current.length > 0 && next.length >= 8 && next === confirm && next !== current;

  function close(o: boolean) {
    if (change.isPending) return;
    if (!o) {
      setCurrent("");
      setNext("");
      setConfirm("");
      change.reset();
    }
    onOpenChange(o);
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>You'll stay signed in here and be signed out on other devices.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) return;
            change.mutate(
              { currentPassword: current, newPassword: next },
              {
                onSuccess: () => {
                  toast({ title: "Password changed" });
                  close(false);
                },
              },
            );
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="current-password">Current password</Label>
            <Input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <PasswordField label="New password" placeholder="New password" value={next} onChange={setNext} />
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={mismatch}
            />
            {mismatch && <p className="text-xs text-destructive">Passwords don't match</p>}
          </div>
          {change.isError && (
            <p role="alert" className="text-sm text-destructive">
              {extractError(change.error)}
            </p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={!valid || change.isPending}>
              {change.isPending ? "Saving…" : "Change password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAccountDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const del = useDeleteAccount();
  const pause = useSetNotificationsPaused();
  const [password, setPassword] = useState("");
  const isTrade = user?.role === "tradesperson";

  function close(o: boolean) {
    if (del.isPending) return;
    if (!o) {
      setPassword("");
      del.reset();
    }
    onOpenChange(o);
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete your account?</DialogTitle>
          <DialogDescription>
            {isTrade
              ? "Your profile will be removed from search, open interests are withdrawn and any remaining credits are forfeited. Reviews stay on the site anonymously."
              : "Your open jobs will be closed and tradespeople you're talking to will be told. Reviews you've left stay on the site anonymously."}{" "}
            This can't be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md border bg-muted/40 p-3 text-sm flex items-start justify-between gap-3">
          <span>
            <span className="font-medium block">Just want fewer emails?</span>
            Pause notifications instead and keep your account.
          </span>
          <Switch
            aria-label="Pause notifications"
            checked={!!user?.notificationsPaused}
            disabled={pause.isPending}
            onCheckedChange={(paused) =>
              pause.mutate(paused, {
                onSuccess: () => toast({ title: paused ? "Notifications paused" : "Notifications resumed" }),
                onError: (err) => toast({ title: "Could not update", description: extractError(err), variant: "destructive" }),
              })
            }
          />
        </div>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!password) return;
            del.mutate(password, {
              onSuccess: async () => {
                await logout();
                toast({ title: "Your account has been deleted" });
                navigate("/", { replace: true });
              },
            });
          }}
        >
          <Label htmlFor="delete-password">Enter your password to confirm</Label>
          <Input
            id="delete-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {del.isError && (
            <p role="alert" className="text-sm text-destructive">
              {extractError(del.error)}
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => close(false)} disabled={del.isPending}>
              Keep my account
            </Button>
            <Button type="submit" variant="destructive" disabled={!password || del.isPending}>
              {del.isPending ? "Deleting…" : "Delete account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** "Change password" and "Delete account" cards, shared by homeowner and tradesperson settings. */
export function AccountSecurity() {
  const [pwOpen, setPwOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-6">
        <h3 className="font-semibold mb-1">Change password</h3>
        <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure.</p>
        <Button variant="outline" size="sm" onClick={() => setPwOpen(true)}>
          Change password
        </Button>
      </div>
      <div className="border rounded-lg p-6">
        <h3 className="font-semibold mb-1">Delete account</h3>
        <p className="text-sm text-muted-foreground mb-4">Close your account and remove your personal details.</p>
        <Button variant="destructive" size="sm" onClick={() => setDelOpen(true)}>
          Delete account
        </Button>
      </div>
      <ChangePasswordDialog open={pwOpen} onOpenChange={setPwOpen} />
      <DeleteAccountDialog open={delOpen} onOpenChange={setDelOpen} />
    </div>
  );
}
