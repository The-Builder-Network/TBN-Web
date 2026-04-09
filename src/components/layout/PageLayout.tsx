import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

/**
 * Shared page layout shell that wraps all public pages with Header + Footer.
 * Used as a layout route in React Router so individual pages don't need to
 * import Header/Footer themselves.
 */
const PageLayout = () => {
  useSocketConnection();
  useNotificationSocket();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
