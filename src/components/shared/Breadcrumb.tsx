import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for the last (current) item
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a horizontal breadcrumb strip with a bottom border.
 * The last item is rendered as plain text (current page).
 *
 * Usage:
 *   <PageBreadcrumb items={[
 *     { label: "Services", href: "/services" },
 *     { label: "Plumbing" },
 *   ]} />
 */
const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => {
  return (
    <div className="border-b bg-muted/20">
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                )}
                {isLast || !item.href ? (
                  <span className={isLast ? "text-foreground" : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
