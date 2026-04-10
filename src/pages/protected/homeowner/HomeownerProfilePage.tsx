import { useState } from "react";
import {
  User,
  Bell,
  HelpCircle,
  MessageCircle,
  KeyRound,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/users";
import { useToast } from "@/hooks/use-toast";

const HomeownerProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "contact" | "account" | "notifications"
  >("contact");
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Could not save your changes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
    });
  };

  const menuItems = [
    { id: "contact" as const, icon: User, label: "Contact information" },
    { id: "account" as const, icon: KeyRound, label: "Manage account" },
    { id: "notifications" as const, icon: Bell, label: "Notifications" },
  ];

  return (
    <div className="container py-10">
      <Helmet>
        <title>My Profile | The Builder Network</title>
        <meta
          name="description"
          content="Manage your Builder Network homeowner profile and account settings."
        />
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <span className="font-semibold text-lg">
              {user?.name ?? "User"}
            </span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
          <nav className="space-y-1">
            <a
              href="/questions"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-foreground hover:bg-secondary/50"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </a>
            <a
              href="mailto:support@thebuildernetwork.co.uk"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-foreground hover:bg-secondary/50"
            >
              <MessageCircle className="w-4 h-4" />
              Contact us
            </a>
          </nav>
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          {activeTab === "contact" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Contact information</h2>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email address
                    </p>
                    <p className="font-medium">{user?.email ?? "—"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Full name</p>
                    {isEditing ? (
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 h-9"
                      />
                    ) : (
                      <p className="font-medium">{user?.name ?? "—"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Phone number
                    </p>
                    {isEditing ? (
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07xxx xxx xxx"
                        className="mt-1 h-9"
                      />
                    ) : (
                      <p className="font-medium">{phone || "Not set"}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Save changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage account</h2>
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
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Notification preferences
              </h2>
              <p className="text-muted-foreground">
                Notification settings will be available soon. You'll be able to
                control email and push notifications here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeownerProfilePage;
