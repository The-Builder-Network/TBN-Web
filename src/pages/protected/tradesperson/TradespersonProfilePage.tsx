import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TABS = ["details", "qualifications", "portfolio", "security"] as const;
type ProfileTab = (typeof TABS)[number];

const ServiceProProfile = () => {
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
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Business / Display Name</Label>
              <Input
                id="name"
                defaultValue={user?.name ?? ""}
                placeholder="Your business name"
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
            <div className="space-y-2">
              <Label htmlFor="bio">About</Label>
              <Textarea
                id="bio"
                placeholder="Tell homeowners about your experience, specialities, and what sets you apart..."
                rows={5}
              />
            </div>
            <Button>Save changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="qualifications" className="space-y-6">
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            Upload and manage your trade qualifications and certifications here.
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            Showcase your previous work with photos and project descriptions.
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            Password change and two-factor authentication settings will go here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceProProfile;
