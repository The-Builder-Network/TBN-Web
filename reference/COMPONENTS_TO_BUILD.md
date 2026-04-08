# Builder Network — Components to Build

> New React components needed to replace hardcoded inline markup,
> fill missing UI gaps, and prepare for backend integration.

---

## 1. Error Handling & Loading

### `ErrorBoundary`
- **Path:** `src/components/shared/ErrorBoundary.tsx`
- **Phase:** 0 / 9
- **Props:**
  ```tsx
  interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode; // optional custom fallback
  }
  ```
- **Renders:** React class component error boundary. On error: centered card with warning icon, "Something went wrong" heading, error message (dev only), "Try again" button (`window.location.reload()`). Reports to Sentry if configured.
- **Used by:** `App.tsx` — wraps each route group.

### `SkeletonCard`
- **Path:** `src/components/shared/SkeletonCard.tsx`
- **Phase:** 0 / 3
- **Props:**
  ```tsx
  interface SkeletonCardProps {
    variant: "job" | "lead" | "question" | "review" | "tradesperson";
    count?: number; // render multiple, default 3
  }
  ```
- **Renders:** Uses shadcn `Skeleton` primitive. Each variant mimics the shape of its real card:
  - `job`: title bar + 2 lines + badge + footer row
  - `lead`: avatar circle + title bar + location line + credit badge
  - `question`: category badge + title lines + answer count
  - `review`: star row + 3 text lines + reviewer line
  - `tradesperson`: avatar circle + name bar + rating + services row
- **Used by:** HomeownerMyJobsPage, TradespersonMyLeadsPage, QuestionsPage, TradespersonPublicProfilePage, search results.

### `EmptyState`
- **Path:** `src/components/shared/EmptyState.tsx`
- **Phase:** 0
- **Props:**
  ```tsx
  interface EmptyStateProps {
    icon: React.ReactNode;       // Lucide icon
    title: string;
    description: string;
    action?: {
      label: string;
      href?: string;             // link
      onClick?: () => void;      // button
    };
  }
  ```
- **Renders:** Centered container with large icon, title, description, optional action button/link.
- **Used by:** Any page with empty query results (my jobs, my leads, contacts, questions).

### `Spinner`
- **Path:** `src/components/shared/Spinner.tsx`
- **Phase:** 0
- **Props:**
  ```tsx
  interface SpinnerProps {
    size?: "sm" | "md" | "lg";   // default "md"
    className?: string;
  }
  ```
- **Renders:** Animated SVG spinner with Tailwind `animate-spin`. Sizes: sm=16px, md=24px, lg=40px.
- **Used by:** Button loading states, Suspense fallbacks, ProtectedRoute.

---

## 2. Domain Cards

### `JobCard`
- **Path:** `src/components/shared/JobCard.tsx`
- **Phase:** 3
- **Props:**
  ```tsx
  interface JobCardProps {
    id: string;
    title: string;
    serviceName: string;
    location: string;
    postedAt: string;           // ISO date
    status: "DRAFT" | "ACTIVE" | "REVIEWING" | "HIRED" | "COMPLETED" | "CANCELLED" | "EXPIRED";
    interestedCount: number;
    shortlistedCount: number;
    onClick?: () => void;
  }
  ```
- **Renders:** Card with title, service badge, location + relative time, status badge (colored via `JobsStatusBadge`), interested/shortlisted counts. Entire card is clickable.
- **Used by:** HomeownerMyJobsPage (list), HomeownerJobDetailPage (header).

### `LeadCard`
- **Path:** `src/components/shared/LeadCard.tsx`
- **Phase:** 4
- **Props:**
  ```tsx
  interface LeadCardProps {
    id: string;
    jobTitle: string;
    serviceName: string;
    location: string;
    distance: string;           // "2.4 miles"
    postedAt: string;
    creditCost: number;
    status: "AVAILABLE" | "INTERESTED" | "SHORTLISTED" | "HIRED" | "EXPIRED" | "DECLINED" | "REFUNDED";
    onClick?: () => void;
  }
  ```
- **Renders:** Card with job title, service badge, location + distance, time ago, credit cost badge (green), status badge. Clickable.
- **Used by:** TradespersonMyLeadsPage.

### `QuoteCard`
- **Path:** `src/components/shared/QuoteCard.tsx`
- **Phase:** 4
- **Props:**
  ```tsx
  interface QuoteCardProps {
    id: string;
    tradespersonName: string;
    tradespersonAvatar?: string;
    tradespersonUsername: string;
    rating: number;
    reviewCount: number;
    message: string;
    createdAt: string;
    status: "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN";
    onAccept?: () => void;
    onDecline?: () => void;
    onViewProfile?: () => void;
  }
  ```
- **Renders:** Card with tradesperson avatar + name (links to profile), star rating, quote message preview, action buttons (Accept / Decline for homeowner view). Status shown if already actioned.
- **Used by:** HomeownerJobDetailPage (responses section).

### `ReviewCard`
- **Path:** `src/components/shared/ReviewCard.tsx`
- **Phase:** 5
- **Props:**
  ```tsx
  interface ReviewCardProps {
    id: string;
    reviewerName: string;
    rating: number;
    comment: string;
    jobTitle: string;
    createdAt: string;
    reply?: {
      text: string;
      createdAt: string;
    };
    canReply?: boolean;         // show reply form
    onReply?: (text: string) => void;
  }
  ```
- **Renders:** Card with reviewer name, star rating, comment text, job reference, date. If reply exists, shows indented reply. If `canReply`, shows a textarea + submit button.
- **Used by:** TradespersonPublicProfilePage (reviews tab), HomeownerJobDetailPage (post-completion).

### `TradespersonCard`
- **Path:** `src/components/shared/TradespersonCard.tsx`
- **Phase:** 5
- **Props:**
  ```tsx
  interface TradespersonCardProps {
    username: string;
    displayName: string;
    companyName?: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    services: string[];         // service names (max 3 shown)
    location: string;
    verified: boolean;
    onClick?: () => void;
  }
  ```
- **Renders:** Horizontal card with avatar (or initials), display name + company, star rating, service tags (truncated), location, verified badge. Clickable → navigates to public profile.
- **Used by:** Search results, recommended tradespeople, question answers (author info).

### `StarRating`
- **Path:** `src/components/shared/StarRating.tsx`
- **Phase:** 5
- **Props:**
  ```tsx
  interface StarRatingProps {
    rating: number;              // 0-5, supports halves
    maxStars?: number;           // default 5
    size?: "sm" | "md" | "lg";
    showValue?: boolean;         // show "4.5" text next to stars
    interactive?: boolean;       // clickable to set rating
    onChange?: (rating: number) => void;
  }
  ```
- **Renders:** Row of star icons (filled/half/empty). Interactive mode: cursor pointer, hover highlight, click to set.
- **Used by:** ReviewCard, TradespersonCard, TradespersonPublicProfilePage, ReviewForm.

### `StatusBadge`
- **Path:** `src/components/shared/StatusBadge.tsx`
- **Phase:** 3
- **Props:**
  ```tsx
  interface StatusBadgeProps {
    status: string;
    type: "job" | "lead" | "quote" | "verification";
  }
  ```
- **Renders:** Colored badge using shadcn `Badge`. Color mapping:
  - job: ACTIVE→green, REVIEWING→blue, HIRED→purple, COMPLETED→gray, CANCELLED→red, EXPIRED→orange
  - lead: AVAILABLE→green, INTERESTED→blue, SHORTLISTED→purple, HIRED→green, EXPIRED→gray
  - quote: PENDING→yellow, ACCEPTED→green, DECLINED→red, WITHDRAWN→gray
  - verification: UNVERIFIED→gray, PENDING→yellow, VERIFIED→green, REJECTED→red
- **Used by:** JobCard, LeadCard, QuoteCard, TradespersonProfilePage.
- **Replaces:** `JobsStatusBadge.tsx` (which only handles job statuses).

---

## 3. Messaging Components

### `ChatWindow`
- **Path:** `src/components/messaging/ChatWindow.tsx`
- **Phase:** 7
- **Props:**
  ```tsx
  interface ChatWindowProps {
    conversationId: string;
    currentUserId: string;
    otherPartyName: string;
    otherPartyAvatar?: string;
  }
  ```
- **Renders:** Full chat panel: header (other party name + avatar), scrollable message list (auto-scroll to bottom), typing indicator, message input with send button. Uses `useMessages(conversationId)` query + `useSendMessage()` mutation. Polls for new messages (or WebSocket upgrade later).
- **Used by:** TradespersonContactsPage (right panel), HomeownerJobDetailPage (messaging drawer).

### `MessageBubble`
- **Path:** `src/components/messaging/MessageBubble.tsx`
- **Phase:** 7
- **Props:**
  ```tsx
  interface MessageBubbleProps {
    content: string;
    sentAt: string;
    isOwn: boolean;              // true = right-aligned blue, false = left-aligned gray
    senderName?: string;
    isRead?: boolean;
  }
  ```
- **Renders:** Chat bubble with tail. Own messages right-aligned (blue bg), other messages left-aligned (gray bg). Shows time below. Read receipt checkmark for own messages.
- **Used by:** ChatWindow.

### `ConversationListItem`
- **Path:** `src/components/messaging/ConversationListItem.tsx`
- **Phase:** 7
- **Props:**
  ```tsx
  interface ConversationListItemProps {
    id: string;
    otherPartyName: string;
    otherPartyAvatar?: string;
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
    isActive: boolean;           // currently selected
    onClick: () => void;
  }
  ```
- **Renders:** List item with avatar, name, last message preview (truncated), time, unread count badge. Highlighted if active.
- **Used by:** TradespersonContactsPage (left panel), HomeownerJobDetailPage (messages list).

---

## 4. Notification Components

### `NotificationBell`
- **Path:** `src/components/notifications/NotificationBell.tsx`
- **Phase:** 7
- **Props:**
  ```tsx
  interface NotificationBellProps {
    // No props — uses useUnreadCount() internally
  }
  ```
- **Renders:** Bell icon (Lucide `Bell`) with red badge showing unread count (hidden if 0). Click toggles `NotificationDropdown`. Uses `useUnreadCount()` query with 30s polling.
- **Used by:** Header.tsx (when user is authenticated).

### `NotificationDropdown`
- **Path:** `src/components/notifications/NotificationDropdown.tsx`
- **Phase:** 7
- **Props:**
  ```tsx
  interface NotificationDropdownProps {
    open: boolean;
    onClose: () => void;
  }
  ```
- **Renders:** Dropdown panel (shadcn `Popover`) with: title "Notifications", "Mark all read" button, scrollable list of notification items (icon + text + time + read/unread dot), "View all" link. Uses `useNotifications({ limit: 10 })`.
- **Used by:** NotificationBell.

### `NotificationItem`
- **Path:** `src/components/notifications/NotificationItem.tsx`
- **Phase:** 7
- **Props:**
  ```tsx
  interface NotificationItemProps {
    id: string;
    type: string;               // NotificationType enum value
    title: string;
    message: string;
    link?: string;
    isRead: boolean;
    createdAt: string;
    onMarkRead: () => void;
  }
  ```
- **Renders:** Row with type-specific icon, title (bold if unread), message preview, relative time. Click navigates to `link` and marks as read.
- **Used by:** NotificationDropdown.

---

## 5. Payment & Credit Components

### `CreditBalance`
- **Path:** `src/components/payments/CreditBalance.tsx`
- **Phase:** 4 / 8
- **Props:**
  ```tsx
  interface CreditBalanceProps {
    variant: "compact" | "full";  // compact = icon + number, full = card with details
  }
  ```
- **Renders:**
  - `compact`: Coin icon + balance number (e.g., "47 credits"). Fits in header/sidebar.
  - `full`: Card with balance, auto-topup status, "Buy credits" button.
  Uses `useBalance()` query.
- **Used by:** Header (compact, tradesperson only), TradespersonProfilePage Balance tab (full), TradespersonLeadDetailPage (compact).

### `PurchaseCreditsModal`
- **Path:** `src/components/payments/PurchaseCreditsModal.tsx`
- **Phase:** 8
- **Props:**
  ```tsx
  interface PurchaseCreditsModalProps {
    open: boolean;
    onClose: () => void;
    highlightPack?: number;      // pre-select a credit pack
  }
  ```
- **Renders:** Dialog with 4 credit packs in a grid:
  - 25 credits — £25 (£1.00/credit)
  - 60 credits — £50 (£0.83/credit) — "Most popular"
  - 150 credits — £100 (£0.67/credit)
  - 400 credits — £200 (£0.50/credit) — "Best value"
  Each pack is a selectable card. "Buy now" button calls `useCreateCheckout()` and redirects to Stripe.
- **Used by:** TradespersonProfilePage Balance tab, TradespersonLeadDetailPage (when insufficient credits).

### `PaymentHistoryTable`
- **Path:** `src/components/payments/PaymentHistoryTable.tsx`
- **Phase:** 8
- **Props:**
  ```tsx
  interface PaymentHistoryTableProps {
    // No props — uses usePaymentHistory() internally
  }
  ```
- **Renders:** Table (shadcn `Table`) with columns: Date, Description, Type (PURCHASE/DEDUCTION/REFUND), Amount (credits), Balance after. Paginated. Uses `usePaymentHistory()`.
- **Used by:** TradespersonProfilePage Payments tab.

---

## 6. Form & Review Components

### `ReviewForm`
- **Path:** `src/components/shared/ReviewForm.tsx`
- **Phase:** 5
- **Props:**
  ```tsx
  interface ReviewFormProps {
    jobId: string;
    tradespersonId: string;
    tradespersonName: string;
    onSuccess: () => void;
  }
  ```
- **Renders:** Card with heading "Leave a review for {name}", interactive StarRating, textarea for comment (required, 10-1000 chars), submit button. Uses `useCreateReview()` mutation, shows toast on success.
- **Used by:** HomeownerJobDetailPage (shown when job status is COMPLETED and no review exists).

### `FormModal`
- **Path:** `src/components/shared/FormModal.tsx`
- **Phase:** 0
- **Props:**
  ```tsx
  interface FormModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;   // form content
    submitLabel?: string;        // default "Submit"
    onSubmit: () => void;
    isLoading?: boolean;
  }
  ```
- **Renders:** shadcn `Dialog` with title, optional description, children slot for form fields, cancel + submit buttons. Submit button shows spinner when loading.
- **Used by:** AskQuestionModal (wrap existing), any future modal forms.

### `ConfirmDialog`
- **Path:** `src/components/shared/ConfirmDialog.tsx`
- **Phase:** 3
- **Props:**
  ```tsx
  interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    confirmLabel?: string;       // default "Confirm"
    variant?: "default" | "destructive";
    onConfirm: () => void;
    isLoading?: boolean;
  }
  ```
- **Renders:** AlertDialog with title, description, cancel + confirm buttons. Destructive variant shows red confirm button.
- **Used by:** Cancel job, decline quote, delete portfolio item, withdraw quote.

### `FileUpload`
- **Path:** `src/components/shared/FileUpload.tsx`
- **Phase:** 3
- **Props:**
  ```tsx
  interface FileUploadProps {
    accept?: string;             // e.g. "image/*,.pdf"
    maxFiles?: number;           // default 5
    maxSizeMB?: number;          // default 10
    value: File[];
    onChange: (files: File[]) => void;
  }
  ```
- **Renders:** Dropzone area with dashed border, upload icon, "Drag & drop or click to browse" text. Shows file previews (thumbnails for images, icons for other types). Validates file size and count. Remove button per file.
- **Used by:** JobFunnel (attachment question), TradespersonProfilePage (portfolio upload), ID document upload.

---

## 7. Search & Filter Components

### `SearchFilterBar`
- **Path:** `src/components/shared/SearchFilterBar.tsx`
- **Phase:** 6
- **Props:**
  ```tsx
  interface SearchFilterBarProps {
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    filters: FilterConfig[];
    onFilterChange: (key: string, value: string) => void;
    sortOptions?: { label: string; value: string }[];
    sortValue?: string;
    onSortChange?: (value: string) => void;
  }

  interface FilterConfig {
    key: string;
    label: string;
    options: { label: string; value: string }[];
    value: string;
  }
  ```
- **Renders:** Row with search input (debounced), filter dropdowns (shadcn `Select`), sort dropdown. Responsive: collapses to sheet on mobile.
- **Used by:** QuestionsPage, TradespersonMyLeadsPage, search results.

### `Pagination`
- **Path:** `src/components/shared/Pagination.tsx`
- **Phase:** 3
- **Props:**
  ```tsx
  interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  ```
- **Renders:** Wraps shadcn `Pagination` primitives with prev/next buttons, page numbers, ellipsis. Syncs with URL search params.
- **Used by:** Any paginated list page.

---

## Summary Table

| # | Component | Path | Phase | Priority |
|---|-----------|------|-------|----------|
| 1 | ErrorBoundary | `shared/ErrorBoundary.tsx` | 0 | Critical |
| 2 | SkeletonCard | `shared/SkeletonCard.tsx` | 0 | Critical |
| 3 | EmptyState | `shared/EmptyState.tsx` | 0 | Critical |
| 4 | Spinner | `shared/Spinner.tsx` | 0 | Critical |
| 5 | FormModal | `shared/FormModal.tsx` | 0 | High |
| 6 | StatusBadge | `shared/StatusBadge.tsx` | 3 | High |
| 7 | JobCard | `shared/JobCard.tsx` | 3 | High |
| 8 | ConfirmDialog | `shared/ConfirmDialog.tsx` | 3 | High |
| 9 | FileUpload | `shared/FileUpload.tsx` | 3 | High |
| 10 | Pagination | `shared/Pagination.tsx` | 3 | High |
| 11 | LeadCard | `shared/LeadCard.tsx` | 4 | High |
| 12 | QuoteCard | `shared/QuoteCard.tsx` | 4 | High |
| 13 | CreditBalance | `payments/CreditBalance.tsx` | 4 | High |
| 14 | StarRating | `shared/StarRating.tsx` | 5 | Medium |
| 15 | ReviewCard | `shared/ReviewCard.tsx` | 5 | Medium |
| 16 | ReviewForm | `shared/ReviewForm.tsx` | 5 | Medium |
| 17 | TradespersonCard | `shared/TradespersonCard.tsx` | 5 | Medium |
| 18 | SearchFilterBar | `shared/SearchFilterBar.tsx` | 6 | Medium |
| 19 | ChatWindow | `messaging/ChatWindow.tsx` | 7 | High |
| 20 | MessageBubble | `messaging/MessageBubble.tsx` | 7 | High |
| 21 | ConversationListItem | `messaging/ConversationListItem.tsx` | 7 | High |
| 22 | NotificationBell | `notifications/NotificationBell.tsx` | 7 | High |
| 23 | NotificationDropdown | `notifications/NotificationDropdown.tsx` | 7 | High |
| 24 | NotificationItem | `notifications/NotificationItem.tsx` | 7 | Medium |
| 25 | PurchaseCreditsModal | `payments/PurchaseCreditsModal.tsx` | 8 | High |
| 26 | PaymentHistoryTable | `payments/PaymentHistoryTable.tsx` | 8 | Medium |

All paths relative to `src/components/`.
