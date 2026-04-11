import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PostcodeInput from "@/components/shared/PostcodeInput";
import TravelRadiusMap from "@/components/register/TravelRadiusMap";
import UKPhoneField from "@/components/shared/UKPhoneField";
import { isValidUKLocal } from "@/helpers/ukPhoneHelper";
import {
  User,
  Star,
  Image,
  FileText,
  Settings,
  BookmarkIcon,
  MapPin,
  Wrench,
  MessageSquare,
  CreditCard,
  Receipt,
  LogOut,
  ChevronRight,
  Info,
  Upload,
  Edit,
  Search,
  FolderOpen,
  Trash2,
  Plus,
  CheckCircle,
  Coins,
  Wallet,
  History,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Shield,
  ShieldAlert,
  FileBadge,
} from "lucide-react";
import {
  useMyProfile,
  useUpdateMyProfile,
  useAddService,
  useRemoveService,
  useUploadPortfolio,
  useDeletePortfolioItem,
  useCreateMessageTemplate,
  useDeleteMessageTemplate,
  useUploadAvatar,
  useDeleteAvatar,
  useUploadDocument,
  useDeleteDocument,
  useUpdateUser,
} from "@/api/users";
import { useReviews } from "@/api/reviews";
import {
  useBalance,
  usePaymentHistory,
  useUpdateAutoTopup,
} from "@/api/payments";
import { Skeleton } from "boneyard-js/react";
import { useLeadsCount } from "@/api/leads";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { PurchaseCreditsModal } from "@/components/payments/PurchaseCreditsModal";
import { computeProfileCompletion } from "@/hooks/useProfileCompletion";
import { services as SERVICE_LIST } from "@/constants/services";

// ── Constants ──────────────────────────────────────────────────

const MIN_SERVICES = 5;

const TABS = [
  {
    id: "company-details",
    label: "Company details",
    icon: FileText,
    section: "profile",
    completionId: ["company-name", "bio"],
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    section: "profile",
    completionId: [] as string[],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: Image,
    section: "profile",
    completionId: ["portfolio"],
  },
  {
    id: "contact-details",
    label: "Contact details",
    icon: User,
    section: "account",
    completionId: [] as string[],
  },
  {
    id: "manage-account",
    label: "Manage account",
    icon: Settings,
    section: "account",
    completionId: [] as string[],
  },
  {
    id: "saved-leads",
    label: "Saved leads",
    icon: BookmarkIcon,
    section: "account",
    completionId: [] as string[],
  },
  {
    id: "my-documents",
    label: "My documents",
    icon: FileBadge,
    section: "account",
    completionId: ["documents"],
  },
  {
    id: "work-area",
    label: "Work area",
    icon: MapPin,
    section: "lead",
    completionId: ["work-area"],
  },
  {
    id: "services",
    label: "Services",
    icon: Wrench,
    section: "lead",
    completionId: ["services"],
  },
  {
    id: "my-message-templates",
    label: "My message templates",
    icon: MessageSquare,
    section: "lead",
    completionId: [] as string[],
  },
  {
    id: "balance",
    label: "Balance",
    icon: CreditCard,
    section: "payments",
    completionId: [] as string[],
  },
  {
    id: "payments",
    label: "Payments",
    icon: Receipt,
    section: "payments",
    completionId: [] as string[],
  },
];

const SECTIONS = [
  { id: "profile", label: null },
  { id: "account", label: "Account" },
  { id: "lead", label: "Lead Settings" },
  { id: "payments", label: "Payments" },
];

// Look up a service's display name by its slug
const getServiceName = (slug: string) =>
  SERVICE_LIST.find((s) => s.slug === slug)?.name ?? slug;

// ── CompanyDetailsTab ──────────────────────────────────────────

const CompanyDetailsTab = () => {
  const { data: profile } = useMyProfile();
  const [companyName, setCompanyName] = useState(profile?.companyName ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [editing, setEditing] = useState(false);
  const [guarantee, setGuarantee] = useState(profile?.guarantee ? "yes" : "no");
  const updateMutation = useUpdateMyProfile();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.companyName ?? "");
      setBio(profile.bio ?? "");
      setGuarantee(profile.guarantee ? "yes" : "no");
    }
  }, [profile]);

  const savedCompanyName = profile?.companyName ?? "";
  const savedBio = profile?.bio ?? "";
  const isDirty = companyName !== savedCompanyName || bio !== savedBio;

  function handleSave() {
    updateMutation.mutate(
      { companyName: companyName.trim() || undefined, bio },
      {
        onSuccess: () => {
          toast({ title: "Company details updated" });
          setEditing(false);
        },
        onError: () =>
          toast({ title: "Failed to update details", variant: "destructive" }),
      },
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Company details</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Help homeowners understand who you are and what you do.
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">About your company</h3>
          {!editing && (
            <button
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm"
              onClick={() => setEditing(true)}
            >
              <Edit className="h-4 w-4" /> Edit
            </button>
          )}
        </div>

        {editing ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>
                Company name{" "}
                <span className="text-xs text-muted-foreground">
                  (+10% profile)
                </span>
              </Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Smith Plumbing Ltd"
                maxLength={100}
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                Company description{" "}
                <span className="text-xs text-muted-foreground">
                  (+10% profile, min 50 chars)
                </span>
              </Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                placeholder="Describe your company, experience and why homeowners should choose you…"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {bio.length}/2000
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCompanyName(savedCompanyName);
                  setBio(savedBio);
                  setEditing(false);
                }}
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={!isDirty || updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-1">
                Company name
              </p>
              <p className="text-base">
                {companyName || (
                  <span className="text-muted-foreground italic">
                    Not set — click Edit to add
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-1">
                Description
              </p>
              <p className="text-muted-foreground whitespace-pre-line">
                {bio || (
                  <span className="italic">Not set — click Edit to add</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Work guarantee</h3>
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

        <Skeleton name="reviews-list" loading={isLoading}>
          {reviews.length === 0 && (
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
                    ? {
                        text: review.reply.body,
                        createdAt: review.reply.createdAt,
                      }
                    : undefined
                }
                canReply
              />
            ))}
          </div>
        </Skeleton>
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
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const portfolioItems = profile?.portfolioItems ?? [];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    files.forEach((file) =>
      upload(
        { file },
        {
          onSuccess: () => toast({ title: "Portfolio Updated" }),
          onError: () =>
            toast({ title: "Upload failed", variant: "destructive" }),
        },
      ),
    );
    e.target.value = "";
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteItem(deleteTarget, {
      onSuccess: () => {
        toast({ title: "Portfolio item removed" });
        setDeleteTarget(null);
      },
      onError: () => {
        toast({
          title: "Failed to remove portfolio item",
          variant: "destructive",
        });
        setDeleteTarget(null);
      },
    });
  }

  const hasMinImages = portfolioItems.length >= 5;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Portfolio</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Add at least 5 images to showcase your work to homeowners.{" "}
        {!hasMinImages && (
          <span className="text-amber-600 font-medium">
            {5 - portfolioItems.length} more needed for +15% profile completion.
          </span>
        )}
      </p>

      <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
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
          {uploading ? "Uploading…" : "Upload photo(s)"}
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          JPEG, PNG · Max 15 MB per file
        </p>
      </div>

      {portfolioItems.length > 0 && (
        <div className="columns-2 md:columns-3 gap-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden border mb-4 break-inside-avoid"
            >
              <img
                src={item.imageUrl}
                alt={item.title ?? "Portfolio item"}
                className="w-full h-auto block"
              />
              <button
                onClick={() => setDeleteTarget(item.id)}
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

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove photo</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this photo from your portfolio?
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ── ContactDetailsTab ──────────────────────────────────────────

const ContactDetailsTab = () => {
  const { data: profile } = useMyProfile();
  const { mutate: updateUser, isPending: saving } = useUpdateUser();
  const { toast } = useToast();

  const storedPhone = profile?.phone ?? "";
  const localPhone = storedPhone.startsWith("+44")
    ? storedPhone.slice(3).trim()
    : storedPhone;

  const [phone, setPhone] = useState(localPhone);
  const [confirmPhone, setConfirmPhone] = useState(localPhone);
  const [phoneError, setPhoneError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    const lp = (profile?.phone ?? "").startsWith("+44")
      ? (profile?.phone ?? "").slice(3).trim()
      : (profile?.phone ?? "");
    setPhone(lp);
    setConfirmPhone(lp);
  }, [profile?.phone]);

  const savedLocal = localPhone;
  const isDirty = phone !== savedLocal || confirmPhone !== savedLocal;

  function handleSavePhone() {
    setPhoneError("");
    setConfirmError("");
    if (!isValidUKLocal(phone)) {
      setPhoneError("Enter a valid UK phone number");
      return;
    }
    if (phone !== confirmPhone) {
      setConfirmError("Phone numbers do not match");
      return;
    }
    updateUser(
      { phone: `+44${phone.replace(/\s/g, "")}` },
      {
        onSuccess: () => toast({ title: "Phone number updated" }),
        onError: () =>
          toast({ title: "Failed to update phone", variant: "destructive" }),
      },
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact details</h2>

      <div className="mb-6">
        <Label className="text-base font-semibold block mb-2">
          Email address
        </Label>
        <Input
          value={profile?.email ?? ""}
          readOnly
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Email cannot be changed here.
        </p>
      </div>

      <div className="mb-6">
        <UKPhoneField
          label="Phone number"
          required
          value={phone}
          onChange={setPhone}
          error={phoneError}
        />
        <div className="mt-3">
          <UKPhoneField
            label="Confirm phone number"
            required
            value={confirmPhone}
            onChange={setConfirmPhone}
            error={confirmError}
          />
        </div>
        <Button
          className="mt-4"
          onClick={handleSavePhone}
          disabled={!isDirty || saving}
        >
          {saving ? "Saving…" : "Update phone number"}
        </Button>
      </div>
    </div>
  );
};

// ── ManageAccountTab ───────────────────────────────────────────

const ManageAccountTab = () => {
  const { user } = useAuth();
  const { mutate: uploadAvatar, isPending: uploading } = useUploadAvatar();
  const { mutate: removeAvatar, isPending: removing } = useDeleteAvatar();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file, {
      onSuccess: () => toast({ title: "Profile photo updated" }),
      onError: () => toast({ title: "Upload failed", variant: "destructive" }),
    });
    e.target.value = "";
  }

  function handleRemoveAvatar() {
    removeAvatar(undefined, {
      onSuccess: () => toast({ title: "Profile photo removed" }),
      onError: () =>
        toast({ title: "Failed to remove photo", variant: "destructive" }),
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage account</h2>

      {/* Avatar / profile photo */}
      <div className="border rounded-lg p-6 mb-4">
        <h3 className="font-semibold mb-4">Profile photo</h3>
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border bg-secondary flex items-center justify-center shrink-0">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">
                {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || removing}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading…" : "Upload photo"}
            </Button>
            {user?.avatarUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveAvatar}
                disabled={uploading || removing}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                {removing ? "Removing…" : "Remove photo"}
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              JPEG, PNG or WebP. Max size: 5 MB
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-1">Change password</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Update your password to keep your account secure.
          </p>
          <Button variant="outline" size="sm">
            Change password
          </Button>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-1">Delete account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="destructive" size="sm">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── SavedLeadsTab ──────────────────────────────────────────────

const SavedLeadsTab = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Saved leads</h2>
      <div className="text-center py-12">
        <FolderOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">
          You don&apos;t have any saved leads
        </h3>
        <p className="text-muted-foreground mb-6">
          Save a lead to access it later
        </p>
        <Button onClick={() => navigate("/tradesperson/my-leads")}>
          Your next lead is just around the corner
        </Button>
      </div>
    </div>
  );
};

// ── WorkAreaTab ────────────────────────────────────────────────

const WorkAreaTab = ({ initialPostcode }: { initialPostcode?: string }) => {
  const { data: profile } = useMyProfile();
  const [postcode, setPostcode] = useState(
    profile?.postcode ?? initialPostcode ?? "",
  );
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [distance, setDistance] = useState(profile?.workRadiusMiles ?? 0);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const updateMutation = useUpdateMyProfile();
  const { data: leadsCount = 0 } = useLeadsCount(postcode, distance);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setPostcode(profile.postcode ?? initialPostcode ?? "");
      setDistance(profile.workRadiusMiles ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    const pc = postcode.trim();
    if (!pc || !postcodeValid) return;
    fetch(`https://api.postcodes.io/postcodes/${pc.replace(/\s+/g, "")}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result)
          setMapCenter([data.result.latitude, data.result.longitude]);
      })
      .catch(() => {});
  }, [postcode, postcodeValid]);

  const savedPostcode = profile?.postcode ?? "";
  const savedDistance = profile?.workRadiusMiles ?? 0;
  const isDirty = postcode !== savedPostcode || distance !== savedDistance;
  const canSave = postcodeValid && distance > 0 && isDirty;

  function handleSave() {
    updateMutation.mutate(
      { postcode, workRadiusMiles: distance },
      {
        onSuccess: () => toast({ title: "Work area updated" }),
        onError: () =>
          toast({
            title: "Failed to update work area",
            variant: "destructive",
          }),
      },
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Work area</h2>
      <p className="text-primary mb-1">
        This is the area you are prepared to travel for work.
      </p>
      {!savedPostcode && (
        <p className="text-amber-600 text-sm mb-4">
          Set your postcode and travel distance to start receiving leads. +10%
          profile completion.
        </p>
      )}

      <div className="mb-6">
        <Label className="text-base font-semibold">Your postcode</Label>
        <div className="mt-2">
          <PostcodeInput
            value={postcode}
            onChange={setPostcode}
            onValidationChange={setPostcodeValid}
          />
        </div>
      </div>

      {postcodeValid && distance > 0 && (
        <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full mb-5">
          {leadsCount} leads in your work area
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm font-semibold mb-8">
          Travel distance from {postcode || "your postcode"}
          {distance === 0 && (
            <span className="text-amber-600 ml-2 font-normal">
              — drag the slider to set
            </span>
          )}
        </p>
        <div className="relative mb-5">
          {distance > 0 && (
            <div
              className="absolute -top-7 text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded"
              style={{
                left: `calc(${((distance - 5) / 95) * 100}% - 20px)`,
              }}
            >
              {distance} miles
            </div>
          )}
          <Slider
            value={[distance]}
            onValueChange={(v) => setDistance(v[0])}
            min={5}
            max={100}
            step={5}
          />
        </div>
        {postcodeValid && distance > 0 && (
          <div
            className="rounded-lg overflow-hidden border mb-5"
            style={{ height: 280 }}
          >
            <TravelRadiusMap
              radius={distance}
              center={mapCenter}
              postcode={postcode}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={!canSave || updateMutation.isPending}
        >
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
  const serviceCount = currentSlugs.length;
  const canRemove = serviceCount > MIN_SERVICES;
  const filtered = SERVICE_LIST.filter((s) =>
    s.name.toLowerCase().includes(searchProfession.toLowerCase()),
  );

  function handleAdd(serviceSlug: string) {
    addService(
      { serviceSlug },
      {
        onSuccess: () => {
          toast({ title: `${getServiceName(serviceSlug)} added` });
          setShowAddDialog(false);
        },
        onError: () =>
          toast({ title: "Failed to add service", variant: "destructive" }),
      },
    );
  }

  function handleRemove(id: string) {
    if (!canRemove) {
      toast({
        title: "Minimum 5 services required",
        description: "You need at least 5 services on your profile.",
      });
      return;
    }
    removeService(id, {
      onError: () =>
        toast({ title: "Failed to remove service", variant: "destructive" }),
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Services</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Add at least 5 services to appear in search results and receive leads.{" "}
        {serviceCount < MIN_SERVICES && (
          <span className="text-amber-600 font-medium">
            {MIN_SERVICES - serviceCount} more needed for +15% profile
            completion.
          </span>
        )}
      </p>

      <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4 mb-6">
        <p className="font-bold">Expand your offering</p>
        <p className="text-sm text-muted-foreground">
          More services = more leads.
        </p>
        <button
          onClick={() => setShowAddDialog(true)}
          className="text-primary font-medium flex items-center gap-1 mt-2 text-sm hover:underline"
        >
          Add services <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {(profile?.services ?? []).length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No services yet. Click &ldquo;Add services&rdquo; above.
        </p>
      ) : (
        (profile?.services ?? []).map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between py-4 border-b"
          >
            <div>
              <p className="font-bold text-base">
                {getServiceName(s.serviceSlug)}
              </p>
              <p className="text-xs text-muted-foreground">{s.serviceSlug}</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleRemove(s.id)}
                  className={`${
                    canRemove
                      ? "text-destructive hover:text-destructive/80"
                      : "text-muted-foreground/40 cursor-not-allowed"
                  }`}
                  aria-label="Remove service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              {!canRemove && (
                <TooltipContent>
                  Minimum {MIN_SERVICES} services required
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        ))
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add service</DialogTitle>
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
            {filtered.map((svc) => {
              const alreadyAdded = currentSlugs.includes(svc.slug);
              return (
                <button
                  key={svc.slug}
                  disabled={alreadyAdded || adding}
                  className="w-full flex items-center justify-between py-3 px-2 border-b hover:bg-muted/50 text-left disabled:opacity-50"
                  onClick={() => !alreadyAdded && handleAdd(svc.slug)}
                >
                  <span className="text-primary text-base">{svc.name}</span>
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

// ── MyDocumentsTab ─────────────────────────────────────────────

const MyDocumentsTab = () => {
  const { data: profile } = useMyProfile();
  const { mutate: upload, isPending: uploading } = useUploadDocument();
  const { mutate: deleteDoc } = useDeleteDocument();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const documents = profile?.documents ?? [];
  const hasDoc = documents.length >= 1;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    files.forEach((file) =>
      upload(file, {
        onSuccess: () => toast({ title: "Document uploaded" }),
        onError: () =>
          toast({ title: "Upload failed", variant: "destructive" }),
      }),
    );
    e.target.value = "";
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteDoc(deleteTarget, {
      onSuccess: () => {
        toast({ title: "Document removed" });
        setDeleteTarget(null);
      },
      onError: () => {
        toast({ title: "Failed to remove document", variant: "destructive" });
        setDeleteTarget(null);
      },
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">My documents</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Upload proof of qualifications, insurance, or certifications. This
        completes your profile (+30%).{" "}
        {!hasDoc && (
          <span className="text-amber-600 font-medium">
            Upload at least one document to reach 100%.
          </span>
        )}
      </p>

      <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          multiple
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
          {uploading ? "Uploading…" : "Upload document(s)"}
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          JPEG, PNG, PDF · Max 20 MB per file
        </p>
      </div>

      {documents.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No documents uploaded yet.
        </p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 border rounded-lg p-4"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                {doc.mimeType === "application/pdf" ? (
                  <FileText className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Image className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{doc.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(doc.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline shrink-0"
              >
                View
              </a>
              <button
                onClick={() => setDeleteTarget(doc.id)}
                className="text-muted-foreground hover:text-destructive shrink-0"
                aria-label="Delete document"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove document</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this document? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove
            </Button>
          </DialogFooter>
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

// ── BalanceTab ────────────────────────────────────────────────

const BalanceTab = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { data: balanceInfo, isLoading } = useBalance();
  const { mutate: updateAutoTopup, isPending: savingAutoTopup } =
    useUpdateAutoTopup();
  const { toast } = useToast();

  const balance = balanceInfo?.balance ?? 0;
  const autoTopupEnabled = balanceInfo?.autoTopup ?? false;

  function handleAutoTopupToggle(enabled: boolean) {
    updateAutoTopup(
      { enabled },
      {
        onSuccess: () =>
          toast({
            title: enabled ? "Auto top-up enabled" : "Auto top-up disabled",
          }),
        onError: () =>
          toast({
            title: "Failed to update auto top-up",
            variant: "destructive",
          }),
      },
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Balance</h2>

      {/* Current balance card */}
      <div className="border rounded-xl p-6 mb-6 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-1">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground font-medium">
            Available credits
          </p>
        </div>
        <Skeleton name="balance-display" loading={isLoading}>
          <p className="text-4xl font-bold flex items-baseline gap-2">
            <Coins className="h-7 w-7 text-amber-500" />
            {balance}
            <span className="text-base font-normal text-muted-foreground">
              credits
            </span>
          </p>
        </Skeleton>
        <Button
          className="mt-4 gap-2"
          onClick={() => setShowPurchaseModal(true)}
        >
          <Coins className="h-4 w-4" />
          Buy credits
        </Button>
      </div>

      {/* Auto top-up */}
      <div className="border rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Auto top-up</p>
            <p className="text-sm text-muted-foreground">
              Automatically buy more credits when your balance runs low.
            </p>
          </div>
          <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded-full">
            Coming soon
          </span>
        </div>
      </div>

      {/* Credit pack info */}
      <div className="border rounded-xl p-5">
        <p className="font-semibold mb-3">Credit pack pricing</p>
        <div className="space-y-2 text-sm">
          {[
            {
              credits: 25,
              price: "£25",
              per: "£1.00/credit",
              label: "Starter",
            },
            {
              credits: 60,
              price: "£50",
              per: "£0.83/credit",
              label: "Standard",
            },
            { credits: 150, price: "£100", per: "£0.67/credit", label: "Pro" },
            {
              credits: 400,
              price: "£200",
              per: "£0.50/credit",
              label: "Enterprise",
            },
          ].map((pack) => (
            <div
              key={pack.credits}
              className="flex items-center justify-between py-1"
            >
              <span className="text-muted-foreground">
                {pack.label} — {pack.credits} credits
              </span>
              <span className="font-medium">
                {pack.price}{" "}
                <span className="text-muted-foreground font-normal">
                  ({pack.per})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <PurchaseCreditsModal
        open={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </div>
  );
};

// ── PaymentsTab ────────────────────────────────────────────────

const PAYMENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  CREDIT_PURCHASE: <TrendingUp className="h-4 w-4 text-green-500" />,
  REFUND: <RefreshCw className="h-4 w-4 text-blue-500" />,
  SUBSCRIPTION: <CreditCard className="h-4 w-4 text-purple-500" />,
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  COMPLETED: "text-green-600 bg-green-50",
  PENDING: "text-amber-600 bg-amber-50",
  FAILED: "text-destructive bg-destructive/10",
  REFUNDED: "text-blue-600 bg-blue-50",
};

const PaymentsTab = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePaymentHistory(page);

  const payments = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatAmount(pence: number) {
    return `£${(pence / 100).toFixed(2)}`;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment history</h2>

      <Skeleton name="payments-history" loading={isLoading}>
        {payments.length === 0 ? (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-semibold mb-1">No payment history yet</p>
            <p className="text-sm text-muted-foreground">
              Your purchases will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="border rounded-lg p-4 flex items-center gap-3"
              >
                <div className="shrink-0">
                  {PAYMENT_TYPE_ICONS[payment.type] ?? (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {payment.description ??
                      payment.type.replace(/_/g, " ").toLowerCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(payment.createdAt)}
                  </p>
                </div>
                {payment.credits !== null && payment.credits !== undefined && (
                  <div className="text-sm font-semibold shrink-0">
                    <span
                      className={
                        payment.credits > 0
                          ? "text-green-600"
                          : "text-destructive"
                      }
                    >
                      {payment.credits > 0 ? "+" : ""}
                      {payment.credits} credits
                    </span>
                  </div>
                )}
                <div className="text-sm font-semibold shrink-0 text-right">
                  <p>{formatAmount(payment.amountPence)}</p>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      PAYMENT_STATUS_COLORS[payment.status] ??
                      "text-muted-foreground bg-muted"
                    }`}
                  >
                    {payment.status.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        )}
      </Skeleton>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────

const TradesProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { data: profile } = useMyProfile();
  const { mutate: uploadAvatar, isPending: uploadingAvatar } =
    useUploadAvatar();
  const { mutate: removeAvatar } = useDeleteAvatar();
  const { toast } = useToast();
  const sidebarAvatarRef = useRef<HTMLInputElement>(null);

  const activeTab = searchParams.get("tab") || "company-details";
  const initialPostcode = searchParams.get("postcode") ?? undefined;

  const setTab = (tab: string) => {
    setSearchParams({ tab });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayName = profile?.companyName ?? user?.name ?? "My Profile";
  const completion = computeProfileCompletion(profile);
  const isVerified = profile?.verificationStatus === "APPROVED";

  function handleSidebarAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file, {
      onSuccess: () => toast({ title: "Profile photo updated" }),
      onError: () => toast({ title: "Upload failed", variant: "destructive" }),
    });
    e.target.value = "";
  }

  function renderTab() {
    switch (activeTab) {
      case "company-details":
        return <CompanyDetailsTab />;
      case "reviews":
        return <ReviewsTab />;
      case "portfolio":
        return <PortfolioTab />;
      case "contact-details":
        return <ContactDetailsTab />;
      case "manage-account":
        return <ManageAccountTab />;
      case "saved-leads":
        return <SavedLeadsTab />;
      case "work-area":
        return <WorkAreaTab initialPostcode={initialPostcode} />;
      case "services":
        return <ServicesTab />;
      case "my-message-templates":
        return <MessageTemplatesTab />;
      case "my-documents":
        return <MyDocumentsTab />;
      case "balance":
        return <BalanceTab />;
      case "payments":
        return <PaymentsTab />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Page not found</h2>
            <p className="text-muted-foreground">Coming soon.</p>
          </div>
        );
    }
  }

  return (
    <div className="container py-10 flex-1 flex flex-col min-h-0">
      <Helmet>
        <title>{displayName} — My Profile | The Builder Network</title>
        <meta
          name="description"
          content="Manage your tradesperson profile, services, work area, reviews and account settings."
        />
      </Helmet>
      <h1 className="text-4xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <div className="overflow-y-auto">
          {/* Avatar section */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="relative">
              <div
                className="relative group w-16 h-16 rounded-full bg-secondary overflow-hidden flex items-center justify-center font-bold shrink-0 cursor-pointer"
                onClick={() => sidebarAvatarRef.current?.click()}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="h-5 w-5 text-white" />
                </div>
              </div>
              {/* Verification icon on avatar */}
              {!isVerified && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                      <ShieldAlert className="h-4 w-4 text-amber-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Profile unverified</TooltipContent>
                </Tooltip>
              )}
              {isVerified && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                      <Shield className="h-4 w-4 text-green-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Verified</TooltipContent>
                </Tooltip>
              )}
            </div>
            <input
              ref={sidebarAvatarRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleSidebarAvatarChange}
            />
            <div className="text-center">
              <span className="font-semibold text-base truncate block">
                {displayName}
              </span>
              {profile?.username && (
                <span className="text-xs text-muted-foreground">
                  @{profile.username}
                </span>
              )}
            </div>

            {/* Unverified badge */}
            {!isVerified && (
              <Badge
                variant="outline"
                className="text-amber-600 border-amber-300 bg-amber-50 text-xs"
              >
                <ShieldAlert className="h-3 w-3 mr-1" /> Unverified
              </Badge>
            )}

            {/* Profile completion bar */}
            {completion.percentage < 100 && (
              <button
                onClick={() => {
                  const first = completion.steps.find((s) => !s.done);
                  if (first) setTab(first.tab);
                }}
                className="w-full"
              >
                <div className="border rounded-lg px-3 py-2 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <p className={`text-sm font-bold ${completion.colorClass}`}>
                    {completion.percentage}% complete
                  </p>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        completion.percentage >= 40
                          ? "bg-amber-500"
                          : "bg-destructive"
                      }`}
                      style={{ width: `${completion.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tap to continue setup
                  </p>
                </div>
              </button>
            )}

            {user?.avatarUrl && (
              <button
                onClick={() =>
                  removeAvatar(undefined, {
                    onSuccess: () => toast({ title: "Photo removed" }),
                  })
                }
                disabled={uploadingAvatar}
                className="text-xs text-destructive hover:underline"
              >
                Remove photo
              </button>
            )}
          </div>

          {/* Nav */}
          <nav className="space-y-1 mt-2">
            {SECTIONS.map((section) => {
              const sectionTabs = TABS.filter((t) => t.section === section.id);
              return (
                <div key={section.id}>
                  {section.label && (
                    <p className="font-bold text-sm mt-4 mb-2">
                      {section.label}
                    </p>
                  )}
                  {sectionTabs.map((tab) => {
                    const pendingPoints =
                      completion.percentage < 100
                        ? completion.steps
                            .filter(
                              (s) => !s.done && tab.completionId.includes(s.id),
                            )
                            .reduce((acc, s) => acc + s.points, 0)
                        : 0;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setTab(tab.id)}
                        className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeTab === tab.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <tab.icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate">{tab.label}</span>
                        {pendingPoints > 0 && (
                          <span className="text-xs text-amber-600 font-semibold shrink-0">
                            +{pendingPoints}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                  <div className="border-t my-2" />
                </div>
              );
            })}
          </nav>

          <button
            onClick={() => void logout()}
            className="flex items-center gap-2 text-destructive text-sm px-3 py-2 mt-2 hover:underline"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pb-10">{renderTab()}</div>
      </div>
    </div>
  );
};

export default TradesProfile;
