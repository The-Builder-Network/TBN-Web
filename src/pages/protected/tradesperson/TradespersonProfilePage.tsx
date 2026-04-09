import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User, Star, Image, FileText, Settings, BookmarkIcon, MapPin, Wrench,
  MessageSquare, Bell, CreditCard, Receipt, Crown, HelpCircle, Gift,
  LogOut, ChevronRight, Info, Upload, Edit, Search, FolderOpen, Zap,
  Trash2, Plus, CheckCircle, XCircle, AlertTriangle,
} from "lucide-react";
import {
  useMyProfile, useUpdateMyProfile, useAddService, useRemoveService,
  useUploadPortfolio, useDeletePortfolioItem,
  useCreateMessageTemplate, useDeleteMessageTemplate,
  useUploadIdDocument,
} from "@/api/users";
import { useReviews } from "@/api/reviews";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ReviewCard } from "@/components/shared/ReviewCard";

// ── Constants ──────────────────────────────────────────────────

const TABS = [
  { id: "company-description", label: "Company description", icon: FileText, section: "profile" },
  { id: "reviews", label: "Reviews", icon: Star, section: "profile" },
  { id: "portfolio", label: "Portfolio", icon: Image, section: "profile" },
  { id: "contact-details", label: "Contact details", icon: FileText, section: "account", badge: "ID required", badgeColor: "text-destructive" },
  { id: "manage-account", label: "Manage account", icon: Settings, section: "account" },
  { id: "saved-leads", label: "Saved leads", icon: BookmarkIcon, section: "account" },
  { id: "work-area", label: "Work area", icon: MapPin, section: "lead" },
  { id: "services", label: "Services", icon: Wrench, section: "lead" },
  { id: "my-message-templates", label: "My message templates", icon: MessageSquare, section: "lead" },
  { id: "notifications", label: "Notifications", icon: Bell, section: "lead" },
  { id: "sponsored-placement", label: "Sponsored placement", icon: Zap, section: "premium", badgeText: "New" },
  { id: "balance", label: "Balance", icon: CreditCard, section: "payments" },
  { id: "payments", label: "Payments", icon: Receipt, section: "payments" },
  { id: "subscription", label: "Subscription", icon: Crown, section: "payments" },
  { id: "support-centre", label: "Support centre", icon: HelpCircle, section: "support" },
  { id: "trade-perks", label: "Trade Perks", icon: Gift, section: "discover" },
];

const SECTIONS = [
  { id: "profile", label: null },
  { id: "account", label: "Account" },
  { id: "lead", label: "Lead Settings" },
  { id: "premium", label: "Premium features" },
  { id: "payments", label: "Payments" },
  { id: "support", label: "Support" },
  { id: "discover", label: "Discover" },
];

const PROFESSIONS = [
  "Moving company", "Cleaning company", "Architectural Designer", "Architectural Technician",
  "Painter & Decorator", "Bathroom Fitter", "Repointing Specialist", "Heating Engineer",
  "Conservatory Installer", "Conversions Specialist", "Damp Proofing Specialist", "Decking Specialist",
  "Joiner", "Carpenter", "Driveways Installer", "Tarmac Specialist",
  "Electrician", "Extension Builder", "Fascias & Soffits Specialist", "Guttering Installer",
  "Bricklayer", "Plumber", "Roofer", "Tiler",
];

// ── CompanyDescriptionTab ──────────────────────────────────────

const CompanyDescriptionTab = () => {
  const { data: profile } = useMyProfile();
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [editing, setEditing] = useState(false);
  const [guarantee, setGuarantee] = useState(profile?.guarantee ? "yes" : "no");
  const updateMutation = useUpdateMyProfile();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? "");
      setGuarantee(profile.guarantee ? "yes" : "no");
    }
  }, [profile]);

  function handleSave() {
    updateMutation.mutate(
      { bio, guarantee: guarantee === "yes" },
      {
        onSuccess: () => {
          toast({ title: "Profile updated" });
          setEditing(false);
        },
        onError: () =>
          toast({ title: "Failed to update profile", variant: "destructive" }),
      },
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Company description</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">About your company</h3>
          {!editing && (
            <button
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => setEditing(true)}
            >
              <Edit className="h-4 w-4" /> Edit
            </button>
          )}
        </div>

        {editing ? (
          <div className="space-y-3">
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              placeholder="Describe your company and experience…"
              maxLength={2000}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setBio(profile?.bio ?? "");
                  setEditing(false);
                }}
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground whitespace-pre-line">
            {bio || "No description yet. Click Edit to add one."}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Guarantee</h3>
        <p className="text-muted-foreground mb-1">
          Increase your chances of getting hired by offering a guarantee.
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
          <Info className="h-3.5 w-3.5" /> Homeowners are aware guarantees vary
          and should discuss the terms in advance.
        </p>
        <RadioGroup
          value={guarantee}
          onValueChange={(v) => {
            setGuarantee(v);
            updateMutation.mutate({ guarantee: v === "yes" });
          }}
          className="space-y-3"
        >
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <Label htmlFor="g-yes" className="text-base cursor-pointer">
              Yes, I offer a guarantee
            </Label>
            <RadioGroupItem value="yes" id="g-yes" />
          </div>
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <Label htmlFor="g-no" className="text-base cursor-pointer">
              No, I do not offer a guarantee
            </Label>
            <RadioGroupItem value="no" id="g-no" />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

// ── ReviewsTab ─────────────────────────────────────────────────

const ReviewsTab = () => {
  const { user } = useAuth();
  const { data: profile } = useMyProfile();
  const { data: reviewsPage, isLoading } = useReviews(user?.id ?? "");

  const reviews = reviewsPage?.data ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Overall rating</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold">
            {profile?.avgRating.toFixed(1) ?? "0.0"}
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(profile?.avgRating ?? 0)
                    ? "fill-star text-star"
                    : "text-muted fill-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">
            ({profile?.reviewCount ?? 0} review
            {profile?.reviewCount !== 1 ? "s" : ""})
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">
          Reviews ({profile?.reviewCount ?? 0})
        </h3>

        {isLoading && (
          <p className="text-muted-foreground">Loading reviews…</p>
        )}

        {!isLoading && reviews.length === 0 && (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              reviewerName={review.authorName}
              reviewerAvatar={review.authorAvatar}
              rating={review.rating}
              comment={review.comment}
              jobTitle={review.jobTitle}
              createdAt={review.createdAt}
              reply={
                review.reply
                  ? { text: review.reply.body, createdAt: review.reply.createdAt }
                  : undefined
              }
              canReply
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── PortfolioTab ───────────────────────────────────────────────

const PortfolioTab = () => {
  const { data: profile } = useMyProfile();
  const { mutate: upload, isPending: uploading } = useUploadPortfolio();
  const { mutate: deleteItem } = useDeletePortfolioItem();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const portfolioItems = profile?.portfolioItems ?? [];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    upload(
      { file },
      {
        onSuccess: () => toast({ title: "Photo uploaded" }),
        onError: () =>
          toast({ title: "Upload failed", variant: "destructive" }),
      },
    );
    e.target.value = "";
  }

  function handleDelete(id: string) {
    deleteItem(id, {
      onSuccess: () => toast({ title: "Photo removed" }),
      onError: () =>
        toast({ title: "Failed to remove photo", variant: "destructive" }),
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Portfolio</h2>

      <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          className="gap-2 text-base"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload file(s)"}
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          JPEG, PNG. Max size: 15MB
        </p>
      </div>

      {portfolioItems.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border"
            >
              <img
                src={item.imageUrl}
                alt={item.title ?? "Portfolio item"}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete photo"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── ContactDetailsTab ──────────────────────────────────────────

const ContactDetailsTab = () => {
  const { data: profile } = useMyProfile();
  const { mutate: uploadId, isPending } = useUploadIdDocument();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const status = profile?.verificationStatus;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadId(file, {
      onSuccess: () =>
        toast({ title: "ID document uploaded. We'll review it shortly." }),
      onError: () =>
        toast({ title: "Upload failed", variant: "destructive" }),
    });
    e.target.value = "";
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact details</h2>

      {status === "APPROVED" ? (
        <div className="border rounded-lg p-4 flex items-center gap-3 bg-green-50 border-green-200">
          <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
          <div>
            <p className="font-bold text-green-800">Identity verified</p>
            <p className="text-sm text-green-700">
              Your account has been verified.
            </p>
          </div>
        </div>
      ) : status === "PENDING" ? (
        <div className="border rounded-lg p-4 flex items-center gap-3 bg-amber-50 border-amber-200">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
          <div>
            <p className="font-bold text-amber-800">Verification pending</p>
            <p className="text-sm text-amber-700">
              We are reviewing your submitted documents.
            </p>
          </div>
        </div>
      ) : status === "REJECTED" ? (
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex items-center gap-3 bg-red-50 border-red-200">
            <XCircle className="h-6 w-6 text-red-600 shrink-0" />
            <div>
              <p className="font-bold text-red-800">Verification rejected</p>
              <p className="text-sm text-red-700">
                Please upload a valid ID document.
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isPending ? "Uploading…" : "Re-upload ID document"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold">Verify your identity</p>
                <p className="text-sm text-muted-foreground">
                  Upload a government-issued photo ID (passport, driving
                  licence).
                </p>
              </div>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isPending ? "Uploading…" : "Upload ID document"}
          </Button>
        </div>
      )}
    </div>
  );
};

// ── ManageAccountTab ───────────────────────────────────────────

const ManageAccountTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Manage account</h2>
    <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-bold">Verify account to access</p>
          <p className="text-sm text-muted-foreground">
            To access your information, please authenticate your account.
          </p>
        </div>
      </div>
      <Button>Verify account</Button>
    </div>
  </div>
);

// ── SavedLeadsTab ──────────────────────────────────────────────

const SavedLeadsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Saved leads</h2>
    <div className="text-center py-12">
      <FolderOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">
        You don&apos;t have any saved leads
      </h3>
      <p className="text-muted-foreground mb-6">Save a lead to access it later</p>
      <Button className="bg-primary text-primary-foreground">
        Your next lead is just around the corner
      </Button>
    </div>
  </div>
);

// ── WorkAreaTab ────────────────────────────────────────────────

const WorkAreaTab = () => {
  const { data: profile } = useMyProfile();
  const [postcode, setPostcode] = useState(profile?.postcode ?? "");
  const [distance, setDistance] = useState(
    String(profile?.workRadiusMiles ?? 10),
  );
  const updateMutation = useUpdateMyProfile();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setPostcode(profile.postcode ?? "");
      setDistance(String(profile.workRadiusMiles ?? 10));
    }
  }, [profile]);

  function handleSave() {
    updateMutation.mutate(
      { postcode, workRadiusMiles: Number(distance) },
      {
        onSuccess: () => toast({ title: "Work area updated" }),
        onError: () =>
          toast({ title: "Failed to update work area", variant: "destructive" }),
      },
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Work area</h2>
      <p className="text-primary mb-6">
        This is the area you are prepared to travel for work and ensures you
        receive relevant leads.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-base font-semibold">Current postcode</Label>
          <Input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            className="mt-2 text-base"
            placeholder="e.g. SW1A 1AA"
          />
        </div>
        <div>
          <Label className="text-base font-semibold">Distance area</Label>
          <Select value={distance} onValueChange={setDistance}>
            <SelectTrigger className="mt-2 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30, 50, 75, 100].map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} miles
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setPostcode(profile?.postcode ?? "");
            setDistance(String(profile?.workRadiusMiles ?? 10));
          }}
        >
          Discard
        </Button>
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
};

// ── ServicesTab ────────────────────────────────────────────────

const ServicesTab = () => {
  const { data: profile } = useMyProfile();
  const { mutate: addService, isPending: adding } = useAddService();
  const { mutate: removeService } = useRemoveService();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchProfession, setSearchProfession] = useState("");

  const currentSlugs = (profile?.services ?? []).map((s) => s.serviceSlug);
  const filtered = PROFESSIONS.filter((p) =>
    p.toLowerCase().includes(searchProfession.toLowerCase()),
  );

  function handleAdd(serviceSlug: string) {
    addService(
      { serviceSlug },
      {
        onSuccess: () => {
          toast({ title: `${serviceSlug} added` });
          setShowAddDialog(false);
        },
        onError: () =>
          toast({ title: "Failed to add service", variant: "destructive" }),
      },
    );
  }

  function handleRemove(id: string) {
    removeService(id, {
      onError: () =>
        toast({ title: "Failed to remove service", variant: "destructive" }),
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Services</h2>

      <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4 mb-6">
        <p className="font-bold">Expand your offering</p>
        <p className="text-sm text-muted-foreground">
          See more leads by adding additional services to your account.
        </p>
        <button
          onClick={() => setShowAddDialog(true)}
          className="text-primary font-medium flex items-center gap-1 mt-2 text-sm hover:underline"
        >
          Choose services <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {(profile?.services ?? []).map((s) => (
        <div key={s.id} className="flex items-center justify-between py-4 border-b">
          <div>
            <p className="font-bold text-base">{s.serviceSlug}</p>
            {s.tradeSlug && (
              <p className="text-sm text-muted-foreground">{s.tradeSlug}</p>
            )}
          </div>
          <button
            onClick={() => handleRemove(s.id)}
            className="text-destructive hover:text-destructive/80"
            aria-label="Remove service"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add service
            </DialogTitle>
          </DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services"
              value={searchProfession}
              onChange={(e) => setSearchProfession(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="overflow-y-auto flex-1 space-y-0">
            {filtered.map((p) => {
              const alreadyAdded = currentSlugs.includes(p);
              return (
                <button
                  key={p}
                  disabled={alreadyAdded || adding}
                  className="w-full flex items-center justify-between py-3 px-2 border-b hover:bg-muted/50 text-left disabled:opacity-50"
                  onClick={() => !alreadyAdded && handleAdd(p)}
                >
                  <span className="text-primary text-base">{p}</span>
                  {alreadyAdded ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ── MessageTemplatesTab ────────────────────────────────────────

const MessageTemplatesTab = () => {
  const { data: profile } = useMyProfile();
  const { mutate: createTemplate, isPending: creating } =
    useCreateMessageTemplate();
  const { mutate: deleteTemplate } = useDeleteMessageTemplate();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBody, setNewBody] = useState("");

  const templates = profile?.messageTemplates ?? [];

  function handleCreate() {
    if (!newName.trim() || !newBody.trim()) return;
    createTemplate(
      { name: newName.trim(), body: newBody.trim() },
      {
        onSuccess: () => {
          toast({ title: "Template created" });
          setShowForm(false);
          setNewName("");
          setNewBody("");
        },
        onError: () =>
          toast({ title: "Failed to create template", variant: "destructive" }),
      },
    );
  }

  function handleDelete(id: string) {
    deleteTemplate(id, {
      onError: () =>
        toast({ title: "Failed to delete template", variant: "destructive" }),
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My message templates</h2>

      <Button
        variant="outline"
        className="mb-6"
        onClick={() => setShowForm(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        New template
      </Button>

      {showForm && (
        <div className="border rounded-lg p-4 mb-6 space-y-3">
          <Input
            placeholder="Template name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Textarea
            placeholder="Message body…"
            rows={4}
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            maxLength={1000}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setNewName("");
                setNewBody("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newName.trim() || !newBody.trim() || creating}
            >
              {creating ? "Saving…" : "Save template"}
            </Button>
          </div>
        </div>
      )}

      {templates.length === 0 && !showForm && (
        <p className="text-muted-foreground">
          No templates yet. Create one to speed up your quoting.
        </p>
      )}

      <div className="space-y-4">
        {templates.map((t) => (
          <div key={t.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                  {t.body}
                </p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-muted-foreground hover:text-destructive shrink-0"
                aria-label="Delete template"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── PlaceholderTab ─────────────────────────────────────────────

const PlaceholderTab = ({ title }: { title: string }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <p className="text-muted-foreground">Coming soon.</p>
  </div>
);

// ── Tab content map ────────────────────────────────────────────

const TAB_CONTENT: Record<string, React.ReactNode> = {
  "company-description": <CompanyDescriptionTab />,
  reviews: <ReviewsTab />,
  portfolio: <PortfolioTab />,
  "contact-details": <ContactDetailsTab />,
  "manage-account": <ManageAccountTab />,
  "saved-leads": <SavedLeadsTab />,
  "work-area": <WorkAreaTab />,
  services: <ServicesTab />,
  "my-message-templates": <MessageTemplatesTab />,
  notifications: <PlaceholderTab title="Notifications" />,
  "sponsored-placement": <PlaceholderTab title="Sponsored placement" />,
  balance: <PlaceholderTab title="Balance" />,
  payments: <PlaceholderTab title="Payments" />,
  subscription: <PlaceholderTab title="Subscription" />,
  "support-centre": <PlaceholderTab title="Support centre" />,
  "trade-perks": <PlaceholderTab title="Trade Perks" />,
};

// ── Main component ─────────────────────────────────────────────

const TradesProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { data: profile } = useMyProfile();
  const activeTab = searchParams.get("tab") || "company-description";

  const setTab = (tab: string) => setSearchParams({ tab });

  const displayName =
    profile?.companyName ?? user?.name ?? "My Profile";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-lg truncate">{displayName}</span>
          </div>

          <button
            onClick={() => setTab("company-description")}
            className="flex items-center gap-2 text-primary font-medium text-sm mb-1 w-full text-left px-2 py-1.5"
          >
            <Edit className="h-4 w-4" /> Complete registration
            <span className="ml-auto w-2 h-2 rounded-full bg-destructive" />
          </button>

          <nav className="space-y-1 mt-4">
            {SECTIONS.map((section) => {
              const sectionTabs = TABS.filter((t) => t.section === section.id);
              return (
                <div key={section.id}>
                  {section.label && (
                    <p className="font-bold text-sm mt-4 mb-2">
                      {section.label}
                    </p>
                  )}
                  {sectionTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setTab(tab.id)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                      {tab.badge && (
                        <span
                          className={`text-xs ml-auto ${tab.badgeColor || "text-muted-foreground"}`}
                        >
                          {tab.badge}
                        </span>
                      )}
                      {tab.badgeText && (
                        <span className="text-xs ml-auto text-primary font-medium">
                          {tab.badgeText}
                        </span>
                      )}
                    </button>
                  ))}
                  {section.id !== "discover" && <div className="border-t my-2" />}
                </div>
              );
            })}
          </nav>

          <button
            onClick={() => void logout()}
            className="flex items-center gap-2 text-destructive text-sm px-3 py-2 mt-4 hover:underline"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>

        {/* Content */}
        <div>
          {TAB_CONTENT[activeTab] ?? (
            <PlaceholderTab title="Page not found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TradesProfile;
