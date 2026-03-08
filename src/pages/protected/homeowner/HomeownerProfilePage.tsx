import { Link } from "react-router-dom";
import { User, Bell, HelpCircle, MessageCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    section: "Account",
    items: [
      { icon: User, label: "Contact information", href: "#" },
      { icon: User, label: "Manage account", href: "#", active: true },
    ],
  },
  {
    section: "Settings",
    items: [{ icon: Bell, label: "Notifications", href: "#" }],
  },
  {
    section: "Support",
    items: [
      { icon: HelpCircle, label: "Support centre", href: "#" },
      { icon: MessageCircle, label: "Contact us", href: "#" },
    ],
  },
];

const HomeownerProfilePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
              F
            </div>
            <span className="font-semibold text-lg">fahad</span>
          </div>

          <nav className="space-y-6">
            {menuItems.map((section) => (
              <div key={section.section}>
                <p className="font-bold mb-2">{section.section}</p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        item.active
                          ? "bg-secondary/80 text-primary font-medium border-l-4 border-primary"
                          : "text-primary hover:bg-secondary/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t mt-3" />
              </div>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Manage account</h2>

          <div className="border rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-lg">Verify account to access</p>
                <p className="text-muted-foreground">
                  To access your information, please authenticate your account.
                </p>
              </div>
            </div>
            <Button>Verify account</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeownerProfilePage;
