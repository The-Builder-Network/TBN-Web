import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TABS = ["details", "security", "notifications"] as const;
type ProfileTab = (typeof TABS)[number];

const HomeownerProfile = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as ProfileTab) || "details";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Personal Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user?.name ?? ""}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email ?? ""}
                placeholder="your@email.com"
              />
            </div>
            <Button>Save changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            Password change and two-factor authentication settings will go here.
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            Email and push notification preferences will go here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeownerProfile;
