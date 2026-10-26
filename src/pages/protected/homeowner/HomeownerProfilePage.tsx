import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  User,
  Bell,
  HelpCircle,
  MessageCircle,
  KeyRound,
  Mail,
  Phone,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import UKPhoneField from "@/components/shared/UKPhoneField";
import { isValidUKLocal } from "@/helpers/ukPhoneHelper";
import { AccountSecurity } from "@/components/account/AccountSecurity";
import {
  useUpdateUser,
  useUploadAvatar,
  useDeleteAvatar,
  useSetNotificationsPaused,
} from "@/api/users";
import { useCreateQuestion } from "@/api/questions";
import { extractError } from "@/api/client";
import { useToast } from "@/hooks/use-toast";

const SUPPORT_EMAIL = "support@thebuildernetwork.com";

type Tab = "contact" | "account" | "notifications" | "help";

const toLocal = (phone?: string | null) => (phone?.startsWith("+44") ? phone.slice(3) : (phone ?? ""));

function ContactTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const update = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(toLocal(user?.phone));
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (!isEditing) {
      setName(user?.name ?? "");
      setPhone(toLocal(user?.phone));
    }
  }, [user?.name, user?.phone, isEditing]);

  function save() {
    setPhoneError("");
    if (phone && !isValidUKLocal(phone)) {
      setPhoneError("Enter a valid UK phone number");
      return;
    }
    update.mutate(
      {
        name: name.trim() || undefined,
        phone: phone ? `+44${phone.replace(/\s/g, "")}` : undefined,
      },
      {
        onSuccess: () => {
          toast({ title: "Profile updated" });
          setIsEditing(false);
        },
        onError: (err) =>
          toast({ title: "Update failed", description: extractError(err), variant: "destructive" }),
      },
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Contact information</h2>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 border rounded-lg">
          <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Email address</p>
            <p className="font-medium">{user?.email ?? "—"}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border rounded-lg">
          <User className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <Label htmlFor="full-name" className="text-sm text-muted-foreground font-normal">
              Full name
            </Label>
            {isEditing ? (
              <Input id="full-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-9" />
            ) : (
              <p className="font-medium">{user?.name ?? "—"}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border rounded-lg">
          <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            {isEditing ? (
              <UKPhoneField label="Phone number" value={phone} onChange={setPhone} error={phoneError} />
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Phone number</p>
                <p className="font-medium">{user?.phone || "Not set"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Shared only with tradespeople you shortlist.
                </p>
              </>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3">
            <Button onClick={save} disabled={update.isPending}>
              {update.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const pause = useSetNotificationsPaused();
  const update = useUpdateUser();
  const fail = (err: unknown) =>
    toast({ title: "Could not update", description: extractError(err), variant: "destructive" });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 border rounded-lg p-5">
          <div>
            <Label htmlFor="notif-email" className="font-semibold">
              Email me about my jobs
            </Label>
            <p className="text-sm text-muted-foreground">
              New interest, messages and reminders. In-app notifications always stay on.
            </p>
          </div>
          <Switch
            id="notif-email"
            checked={!user?.notificationsPaused}
            disabled={pause.isPending}
            onCheckedChange={(on) => pause.mutate(!on, { onError: fail })}
          />
        </div>
        <div className="flex items-start justify-between gap-4 border rounded-lg p-5">
          <div>
            <Label htmlFor="notif-marketing" className="font-semibold">
              Tips and offers
            </Label>
            <p className="text-sm text-muted-foreground">Occasional emails with home improvement ideas.</p>
          </div>
          <Switch
            id="notif-marketing"
            checked={!!user?.marketingOptIn}
            disabled={update.isPending}
            onCheckedChange={(on) => update.mutate({ marketingOptIn: on }, { onError: fail })}
          />
        </div>
      </div>
    </div>
  );
}

function HelpTab() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const create = useCreateQuestion();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const valid = title.trim().length >= 5 && body.trim().length >= 10;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Help &amp; support</h2>
      <p className="text-muted-foreground mb-6">
        Ask a question and our community of tradespeople will answer it on{" "}
        <Link to="/questions" className="text-primary hover:underline">
          Ask a tradesperson
        </Link>
        .
      </p>

      <form
        className="space-y-4 border rounded-lg p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          create.mutate(
            { title: title.trim(), body: body.trim() },
            {
              onSuccess: (q) => {
                toast({ title: "Question posted", description: "We'll let you know when someone answers." });
                navigate(`/questions/${q.id}`);
              },
              onError: (err) =>
                toast({ title: "Could not post question", description: extractError(err), variant: "destructive" }),
            },
          );
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="help-title">Your question</Label>
          <Input
            id="help-title"
            value={title}
            maxLength={200}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How much does it cost to replace a boiler?"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="help-body">Details</Label>
          <Textarea
            id="help-body"
            rows={5}
            maxLength={5000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add any details that will help a tradesperson answer (at least 10 characters)."
          />
        </div>
        <Button type="submit" disabled={!valid || create.isPending}>
          {create.isPending ? "Posting…" : "Submit question"}
        </Button>
      </form>

      <div className="mt-6 border rounded-lg p-5">
        <p className="font-semibold">Still not resolved?</p>
        <p className="text-sm text-muted-foreground mb-3">
          Email our support team and we'll get back to you within one working day.
        </p>
        <Button variant="outline" asChild>
          <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Help with my account")}`}>
            <Mail className="h-4 w-4 mr-2" />
            Email {SUPPORT_EMAIL}
          </a>
        </Button>
      </div>
    </div>
  );
}

const HomeownerProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [params, setParams] = useSearchParams();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar, isPending: uploadingAvatar } = useUploadAvatar();
  const { mutate: removeAvatar, isPending: removingAvatar } = useDeleteAvatar();

  const menuItems = [
    { id: "contact" as const, icon: User, label: "Contact information" },
    { id: "account" as const, icon: KeyRound, label: "Manage account" },
    { id: "notifications" as const, icon: Bell, label: "Notifications" },
    { id: "help" as const, icon: HelpCircle, label: "Help & support" },
  ];
  const activeTab: Tab = menuItems.find((m) => m.id === params.get("tab"))?.id ?? "contact";

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file, {
      onSuccess: () => toast({ title: "Profile photo updated" }),
      onError: (err) => toast({ title: "Upload failed", description: extractError(err), variant: "destructive" }),
    });
    e.target.value = "";
  }

  return (
    <div className="container py-10">
      <Helmet>
        <title>My Profile | The Builder Network</title>
        <meta name="description" content="Manage your Builder Network homeowner profile and account settings." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div>
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border bg-primary/10 flex items-center justify-center">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user?.name ?? "Avatar"} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary">{user?.name?.charAt(0)?.toUpperCase() ?? "U"}</span>
              )}
            </div>
            <span className="font-semibold text-lg">{user?.name ?? "User"}</span>
            <div className="flex gap-2">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar || removingAvatar}
                className="gap-1 text-xs h-7 px-2"
              >
                <Upload className="w-3 h-3" />
                {uploadingAvatar ? "Uploading…" : "Upload photo"}
              </Button>
              {user?.avatarUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    removeAvatar(undefined, {
                      onSuccess: () => toast({ title: "Profile photo removed" }),
                      onError: () => toast({ title: "Failed to remove photo", variant: "destructive" }),
                    })
                  }
                  disabled={uploadingAvatar || removingAvatar}
                  className="gap-1 text-xs h-7 px-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                  {removingAvatar ? "Removing…" : "Remove"}
                </Button>
              )}
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setParams(item.id === "contact" ? {} : { tab: item.id })}
                aria-current={activeTab === item.id ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activeTab === item.id
                    ? "bg-secondary/80 text-primary font-medium"
                    : "text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t my-4" />
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-foreground hover:bg-secondary/50"
          >
            <MessageCircle className="w-4 h-4" />
            Contact us
          </a>
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          {activeTab === "contact" && <ContactTab />}
          {activeTab === "account" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage account</h2>
              <AccountSecurity />
            </div>
          )}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "help" && <HelpTab />}
        </div>
      </div>
    </div>
  );
};

export default HomeownerProfilePage;
