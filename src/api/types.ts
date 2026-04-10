// ── Shared API types ──────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export type SortOrder = "asc" | "desc";

export type UserRole = "HOMEOWNER" | "TRADESPERSON" | "ADMIN";

export type JobStatus =
  | "DRAFT"
  | "ACTIVE"
  | "SHORTLISTING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "CLOSED";

export type LeadStatus =
  | "AVAILABLE"
  | "INTERESTED"
  | "SHORTLISTED"
  | "CONTACTED"
  | "HIRED"
  | "REJECTED"
  | "EXPIRED";

export type QuoteStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN";

export type NotificationType =
  | "NEW_LEAD"
  | "NEW_INTEREST"
  | "NEW_QUOTE"
  | "NEW_MESSAGE"
  | "NEW_REVIEW"
  | "JOB_COMPLETED"
  | "JOB_CANCELLED"
  | "LEAD_EXPIRED"
  | "CREDIT_LOW"
  | "CREDIT_TOPUP"
  | "ACCOUNT_VERIFIED"
  | "NEW_ANSWER"
  | "ANSWER_LIKED";

// ── User ──────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  username?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
}

// ── Job ───────────────────────────────────────────────────────
export interface JobSummary {
  id: string;
  jobNumber: number;
  title: string;
  status: JobStatus;
  serviceSlug: string;
  postcode: string;
  placeName?: string;
  interestedCount: number;
  createdAt: string;
}

export interface JobDetail {
  id: string;
  jobNumber: number;
  title: string;
  description: string;
  status: JobStatus;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  placeName?: string;
  answersJson: Record<string, unknown>;
  attachments: Array<{ id: string; fileUrl: string; fileName: string; mimeType: string }>;
  createdAt: string;
  responses?: JobResponse[];
}

export interface JobResponse {
  leadId: string;
  leadStatus: LeadStatus;
  tradesperson: {
    id: string;
    username?: string;
    name: string;
    companyName?: string;
    avatarUrl?: string;
    avgRating: number;
    reviewCount: number;
    verified: boolean;
  };
  quote?: {
    id: string;
    message: string;
    amountPence?: number;
    estimateRange?: string;
    status: QuoteStatus;
  };
}

// ── Lead ──────────────────────────────────────────────────────
export interface LeadSummary {
  id: string;
  job: {
    id: string;
    title: string;
    serviceSlug: string;
    postcode: string;
    placeName?: string;
    description: string;
    createdAt: string;
  };
  status: LeadStatus;
  creditCost: number;
  distanceMiles?: number;
  createdAt: string;
}

export interface LeadDetail extends LeadSummary {
  job: LeadSummary["job"] & {
    tradeSlug?: string;
    answersJson: Record<string, unknown>;
    attachments: Array<{ fileUrl: string; fileName: string }>;
  };
  homeowner?: { name: string; avatarUrl?: string };
  quote?: {
    id: string;
    message: string;
    amountPence?: number;
    status: QuoteStatus;
  };
}

// ── Quote ─────────────────────────────────────────────────────
export interface QuoteSummary {
  id: string;
  tradesperson: {
    id: string;
    username: string;
    name: string;
    companyName?: string;
    avatarUrl?: string;
    avgRating: number;
    reviewCount: number;
  };
  message: string;
  amountPence?: number;
  estimateRange?: string;
  status: QuoteStatus;
  createdAt: string;
}

// ── Conversation & Message ─────────────────────────────────────
export interface ConversationSummary {
  id: string;
  job: { id: string; title: string };
  otherParty: {
    id: string;
    name: string;
    companyName?: string;
    avatarUrl?: string;
    username?: string;
  };
  lastMessage?: { body: string; senderId: string; createdAt: string };
  unreadCount: number;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  body: string;
  readAt?: string;
  createdAt: string;
}

// ── Review ────────────────────────────────────────────────────
export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  jobTitle: string;
  createdAt: string;
  reply?: { body: string; createdAt: string };
}

// ── Question & Answer ──────────────────────────────────────────
export interface QuestionSummary {
  id: string;
  title: string;
  body: string;
  serviceSlug?: string;
  authorName: string;
  answerCount: number;
  hasBestAnswer: boolean;
  createdAt: string;
}

export interface AnswerItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorUsername?: string;
  authorTrade?: string;
  body: string;
  isBest: boolean;
  likesCount: number;
  likedByMe: boolean;
  createdAt: string;
}

export interface QuestionDetail {
  id: string;
  title: string;
  body: string;
  serviceSlug?: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  answers: AnswerItem[];
}

// ── Notification ──────────────────────────────────────────────
export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  linkUrl?: string;
  read: boolean;
  createdAt: string;
}

// ── Payments ──────────────────────────────────────────────────
export interface BalanceInfo {
  balance: number;
  autoTopup: boolean;
  topupAmount?: number;
  topupThreshold?: number;
  lastTopupAt?: string;
}

export interface PaymentItem {
  id: string;
  type: "CREDIT_PURCHASE" | "SUBSCRIPTION" | "REFUND";
  amountPence: number;
  credits?: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  description?: string;
  createdAt: string;
}

// ── Public Profile ─────────────────────────────────────────────
export interface PublicProfile {
  username: string;
  name: string;
  companyName?: string;
  trade?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  bio?: string;
  location?: string;
  postcode?: string;
  memberSince: string;
  lastActive?: string;
  responseTime?: string;
  verified: boolean;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  badges: string[];
  services: string[];
  qualifications: Array<{ name: string; verified: boolean }>;
  insurance: {
    publicLiability?: string;
    employersLiability?: string;
    professionalIndemnity?: string;
    verified: boolean;
    expiresAt?: string;
  };
  portfolioItems: Array<{
    id: string;
    imageUrl: string;
    title?: string;
    category?: string;
  }>;
  ratingBreakdown: Record<string, number>;
  reviews: ReviewItem[];
}

// ── Tradesperson Profile (own) ─────────────────────────────────
export interface OwnTradespersonProfile {
  id: string;
  username: string;
  companyName?: string;
  bio?: string;
  trade?: string;
  postcode?: string;
  workRadiusMiles: number;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  guarantee: boolean;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  services: Array<{ id: string; serviceSlug: string; tradeSlug?: string }>;
  qualifications: Array<{
    id: string;
    name: string;
    verified: boolean;
    year?: number;
  }>;
  portfolioItems: Array<{
    id: string;
    imageUrl: string;
    title?: string;
    category?: string;
  }>;
  insurance: {
    publicLiability?: string;
    employersLiability?: string;
    professionalIndemnity?: string;
    verified: boolean;
    expiresAt?: string;
  };
  messageTemplates: Array<{ id: string; name: string; body: string }>;
}

// ── Search ─────────────────────────────────────────────────────
export interface TradespersonSearchResult {
  username: string;
  name: string;
  companyName?: string;
  trade?: string;
  avatarUrl?: string;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  verified: boolean;
  distanceMiles?: number;
  services: string[];
}
