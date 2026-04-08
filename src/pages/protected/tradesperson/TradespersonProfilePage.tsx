import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
  LogOut, ChevronRight, Info, Upload, Edit, Search, FolderOpen, Zap
} from "lucide-react";

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
  "Joiner", "MyBuilder Carpenter", "Driveways Installer", "Tarmac Specialist",
  "MyBuilder Electrician", "Extension Builder", "Fascias & Soffits Specialist", "Guttering Installer",
  "Bricklayer", "Plumber", "Roofer", "Tiler",
];

const CompanyDescriptionTab = () => {
  const [description, setDescription] = useState("");
  const [guarantee, setGuarantee] = useState("no");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Company description</h2>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">About your company</h3>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Edit className="h-4 w-4" /> Edit
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Guarantee</h3>
        <p className="text-muted-foreground mb-1">Increase your chances of getting hired by offering a guarantee.</p>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
          <Info className="h-3.5 w-3.5" /> Homeowners are aware guarantees vary and should discuss the terms in advance.
        </p>
        <RadioGroup value={guarantee} onValueChange={setGuarantee} className="space-y-3">
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <Label htmlFor="g-yes" className="text-base cursor-pointer">Yes, I offer a guarantee</Label>
            <RadioGroupItem value="yes" id="g-yes" />
          </div>
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <Label htmlFor="g-no" className="text-base cursor-pointer">No, I do not offer a guarantee</Label>
            <RadioGroupItem value="no" id="g-no" />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

const ReviewsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Reviews</h2>
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">Overall rating</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold">0</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-star-empty" />
          ))}
        </div>
        <span className="text-muted-foreground">(0 reviews)</span>
      </div>
      <Button className="w-full md:w-auto bg-primary text-primary-foreground h-12 text-base">
        Request a review
      </Button>
    </div>
    <div>
      <h3 className="text-lg font-bold mb-4">Reviews (0)</h3>
      <p className="text-muted-foreground">No reviews yet.</p>
    </div>
  </div>
);

const PortfolioTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
    <div className="border-2 border-dashed rounded-lg p-8 text-center">
      <Button variant="outline" className="gap-2 text-base">
        <Upload className="h-4 w-4" /> Upload file(s)
      </Button>
      <p className="text-sm text-muted-foreground mt-3">Max 20 files. JPEG, JPG, PNG, PDF. Max size: 15MB</p>
    </div>
  </div>
);

const ContactDetailsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Contact details</h2>
    <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-bold">Verify account to access</p>
          <p className="text-sm text-muted-foreground">To access your information, please authenticate your account.</p>
        </div>
      </div>
      <Button>Verify account</Button>
    </div>
  </div>
);

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
          <p className="text-sm text-muted-foreground">To access your information, please authenticate your account.</p>
        </div>
      </div>
      <Button>Verify account</Button>
    </div>
  </div>
);

const SavedLeadsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Saved leads</h2>
    <div className="text-center py-12">
      <FolderOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">You don't have any saved leads</h3>
      <p className="text-muted-foreground mb-6">Save a lead to access it later</p>
      <Button className="bg-primary text-primary-foreground">Your next lead is just around the corner</Button>
    </div>
  </div>
);

const WorkAreaTab = () => {
  const [location] = useState("Umberleigh");
  const [distance, setDistance] = useState("10");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Work area</h2>
      <p className="text-primary mb-6">This is the area you are prepared to travel for work and ensures you receive relevant leads.</p>

      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-base font-semibold">Current location</Label>
          <Input value={location} readOnly className="mt-2 text-base" />
        </div>
        <div>
          <Label className="text-base font-semibold">Distance area</Label>
          <Select value={distance} onValueChange={setDistance}>
            <SelectTrigger className="mt-2 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30, 50, 75, 100].map((d) => (
                <SelectItem key={d} value={String(d)}>{d} miles</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-primary text-sm mb-3">Drag the pins to adjust your working distance</p>
      <div className="w-full h-64 bg-muted rounded-lg mb-6 flex items-center justify-center text-muted-foreground">
        Map placeholder
      </div>

      <div className="flex gap-3">
        <Button variant="outline">Discard</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

const ServicesTab = () => {
  const [showAddProfession, setShowAddProfession] = useState(false);
  const [searchProfession, setSearchProfession] = useState("");
  const [services, setServices] = useState([{ name: "Bricklayer", sub: "Bricklaying", enabled: true }]);

  const filtered = PROFESSIONS.filter((p) =>
    p.toLowerCase().includes(searchProfession.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Services</h2>

      <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4 mb-6">
        <p className="font-bold">Expand your offering on MyBuilder</p>
        <p className="text-sm text-muted-foreground">See more leads by adding additional services to your account.</p>
        <button
          onClick={() => setShowAddProfession(true)}
          className="text-primary font-medium flex items-center gap-1 mt-2 text-sm hover:underline"
        >
          Choose services <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {services.map((s, i) => (
        <div key={i} className="flex items-center justify-between py-4 border-b">
          <div>
            <p className="font-bold text-base">{s.name}</p>
            <p className="text-sm text-muted-foreground">{s.sub}</p>
          </div>
          <Switch checked={s.enabled} onCheckedChange={(checked) => {
            const updated = [...services];
            updated[i].enabled = checked;
            setServices(updated);
          }} />
        </div>
      ))}

      <Dialog open={showAddProfession} onOpenChange={setShowAddProfession}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add profession</DialogTitle>
          </DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search professions"
              value={searchProfession}
              onChange={(e) => setSearchProfession(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="overflow-y-auto flex-1 space-y-0">
            {filtered.map((p) => (
              <button
                key={p}
                className="w-full flex items-center justify-between py-3 px-2 border-b hover:bg-muted/50 text-left"
                onClick={() => {
                  if (!services.find((s) => s.name === p)) {
                    setServices([...services, { name: p, sub: p, enabled: true }]);
                  }
                  setShowAddProfession(false);
                }}
              >
                <span className="text-primary text-base">{p}</span>
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PlaceholderTab = ({ title }: { title: string }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <p className="text-muted-foreground">Coming soon.</p>
  </div>
);

const TAB_CONTENT: Record<string, React.ReactNode> = {
  "company-description": <CompanyDescriptionTab />,
  "reviews": <ReviewsTab />,
  "portfolio": <PortfolioTab />,
  "contact-details": <ContactDetailsTab />,
  "manage-account": <ManageAccountTab />,
  "saved-leads": <SavedLeadsTab />,
  "work-area": <WorkAreaTab />,
  "services": <ServicesTab />,
  "my-message-templates": <PlaceholderTab title="My message templates" />,
  "notifications": <PlaceholderTab title="Notifications" />,
  "sponsored-placement": <PlaceholderTab title="Sponsored placement" />,
  "balance": <PlaceholderTab title="Balance" />,
  "payments": <PlaceholderTab title="Payments" />,
  "subscription": <PlaceholderTab title="Subscription" />,
  "support-centre": <PlaceholderTab title="Support centre" />,
  "trade-perks": <PlaceholderTab title="Trade Perks" />,
};

const TradesProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "company-description";

  const setTab = (tab: string) => setSearchParams({ tab });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">U</div>
            <span className="font-semibold text-lg">Umberleigh</span>
          </div>
          <Button variant="outline" className="w-full mb-4 text-sm">View profile</Button>

          <button
            onClick={() => setTab("company-description")}
            className="flex items-center gap-2 text-primary font-medium text-sm mb-1 w-full text-left px-2 py-1.5"
          >
            <Edit className="h-4 w-4" /> Complete registration
            <span className="ml-auto w-2 h-2 rounded-full bg-destructive" />
          </button>
          <p className="text-xs text-muted-foreground mb-4 pl-8">10 steps left</p>

          <nav className="space-y-1">
            {SECTIONS.map((section) => {
              const sectionTabs = TABS.filter((t) => t.section === section.id);
              return (
                <div key={section.id}>
                  {section.label && (
                    <p className="font-bold text-sm mt-4 mb-2">{section.label}</p>
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
                        <span className={`text-xs ml-auto ${tab.badgeColor || "text-muted-foreground"}`}>
                          {tab.badge}
                        </span>
                      )}
                      {tab.badgeText && (
                        <span className="text-xs ml-auto text-primary font-medium">{tab.badgeText}</span>
                      )}
                    </button>
                  ))}
                  {section.id !== "discover" && <div className="border-t my-2" />}
                </div>
              );
            })}
          </nav>

          <button className="flex items-center gap-2 text-destructive text-sm px-3 py-2 mt-4 hover:underline">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>

        {/* Content */}
        <div>{TAB_CONTENT[activeTab] || <PlaceholderTab title="Page not found" />}</div>
      </div>
    </div>
  );
};

export default TradesProfile;
