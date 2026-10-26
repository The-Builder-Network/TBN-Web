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

export type JobStatus = "ACTIVE" | "HIRED" | "COMPLETED" | "CLOSED" | "EXPIRED";

export type LeadStatus =
  | "AVAILABLE"
  | "INTERESTED"
  | "SHORTLISTED"
  | "HIRED"
  | "DECLINED"
  | "WITHDRAWN"
  | "NOT_SELECTED"
  | "EXPIRED";

export type LeadTab = "new" | "interested" | "shortlisted" | "hired" | "archived";

export type VerificationStatus =
  | "NOT_SUBMITTED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "INFO_REQUESTED"
  | "SUSPENDED";

export type CreditRequestReason =
  | "CUSTOMER_UNREACHABLE"
  | "WRONG_WORK_TYPE"
  | "DUPLICATE_SHORTLIST"
  | "NOT_A_REAL_JOB"
  | "OTHER";

export type QuoteStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN";

export type NotificationType =
  | "NEW_LEAD"
  | "JOB_INVITE"
  | "NEW_INTEREST"
  | "INTEREST_DECLINED"
  | "SHORTLISTED"
  | "NOT_SELECTED"
  | "HIRED"
  | "NEW_QUOTE"
  | "QUOTE_ACCEPTED"
  | "NEW_MESSAGE"
  | "NEW_REVIEW"
  | "REVIEW_REQUESTED"
  | "JOB_COMPLETED"
  | "JOB_CANCELLED"
  | "JOB_CLOSED"
  | "LEAD_EXPIRED"
  | "CREDIT_LOW"
  | "CREDIT_TOPUP"
  | "CREDIT_REQUEST_RESOLVED"
  | "ACCOUNT_VERIFIED"
  | "VERIFICATION_REJECTED"
  | "VERIFICATION_INFO_REQUESTED"
  | "NEW_ANSWER"
  | "ANSWER_LIKED";

// ── User ──────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  username: string | null;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
}

// ── Job ───────────────────────────────────────────────────────
export interface JobAnswer {
  question: string;
  answer: string;
}

export interface JobAttachment {
  id: string;
  fileUrl: string;
  fileName: string;
  mimeType: string;
}

export interface JobSummary {
  id: string;
  jobNumber: number;
  title: string;
  status: JobStatus;
  serviceSlug: string;
  postcode: string;
  placeName?: string | null;
  interestedCount: number;
  shortlistedCount: number;
  createdAt: string;
}

export interface JobDetail {
  id: string;
  jobNumber: number;
  title: string;
  description: string;
  status: JobStatus;
  serviceSlug: string;
  tradeSlug?: string | null;
  postcode: string;
  placeName?: string | null;
  answers: JobAnswer[];
  attachments: JobAttachment[];
  createdAt: string;
  expiresAt?: string | null;
  hiredAt?: string | null;
  completedAt?: string | null;
  closedAt?: string | null;
  closeReason?: string | null;
  hiredTradespersonId?: string | null;
  shortlistCap: number;
  inviteCap: number;
  review: {
    id: string;
    rating: number;
    comment: string;
    subjectId: string;
    createdAt: string;
    updatedAt: string;
    reply: { body: string; createdAt: string } | null;
  } | null;
  responses: JobResponse[];
}

export interface JobResponse {
  leadId: string;
  leadStatus: LeadStatus;
  invited: boolean;
  interestMessage: string | null;
  interestedAt: string | null;
  shortlistedAt: string | null;
  hiredAt: string | null;
  conversationId: string | null;
  tradesperson: {
    id: string;
    username?: string;
    name: string;
    companyName?: string | null;
    avatarUrl?: string | null;
    avgRating: number;
    reviewCount: number;
    verified: boolean;
    /** Only once shortlisted. */
    phone: string | null;
    email: string | null;
  };
  quote: {
    id: string;
    message: string;
    amountPence?: number | null;
    estimateRange?: string | null;
    status: QuoteStatus;
    updatedAt: string;
  } | null;
}

// ── Lead ──────────────────────────────────────────────────────
export interface LeadSummary {
  id: string;
  status: LeadStatus;
  creditCost: number;
  creditsReserved: number;
  creditsCharged: number;
  distanceMiles?: number | null;
  invited: boolean;
  dismissed: boolean;
  interestMessage: string | null;
  createdAt: string;
  expiresAt?: string | null;
  interestedAt: string | null;
  shortlistedAt: string | null;
  hiredAt: string | null;
  declinedAt: string | null;
  notSelectedAt: string | null;
  reviewRequestedAt: string | null;
  canExpressInterest: boolean;
  job: {
    id: string;
    jobNumber: number;
    title: string;
    description: string;
    serviceSlug: string;
    tradeSlug?: string | null;
    status: JobStatus;
    placeName?: string | null;
    postcodeDistrict?: string | null;
    /** Full postcode only once shortlisted. */
    postcode: string | null;
    createdAt: string;
    attachmentCount?: number;
  };
  homeowner: {
    firstName: string;
    name: string | null;
    phone: string | null;
    email: string | null;
  };
  creditRequest: {
    id: string;
    reason: CreditRequestReason;
    status: "PENDING" | "APPROVED" | "REJECTED";
    adminNote: string | null;
    createdAt: string;
  } | null;
}

export interface LeadDetail extends LeadSummary {
  job: LeadSummary["job"] & {
    answers: JobAnswer[];
    attachments: JobAttachment[];
  };
  verificationRequired: boolean;
  quote: {
    id: string;
    message: string;
    amountPence?: number | null;
    estimateRange?: string | null;
    status: QuoteStatus;
    updatedAt: string;
  } | null;
  conversationId: string | null;
  review: { id: string; rating: number; comment: string; createdAt: string } | null;
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
  job: { id: string; title: string; status?: JobStatus };
  leadId?: string | null;
  otherParty: {
    id: string;
    name: string;
    companyName?: string;
    avatarUrl?: string;
    username?: string;
  };
  lastMessage?: { body: string; senderId: string; createdAt: string } | null;
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
  questionNumber: number;
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
  authorId: string;
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
  questionNumber: number;
  authorId: string;
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
  /** Held for open expressions of interest; charged if shortlisted. */
  reserved: number;
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
  guarantee: boolean;
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
  verificationStatus: VerificationStatus;
  verification: {
    status: VerificationStatus;
    note: string | null;
    submittedAt: string | null;
    verifiedAt: string | null;
    idDocumentName: string | null;
    idDocumentUploadedAt: string | null;
    checklist: {
      idDocument: boolean;
      services: boolean;
      workArea: boolean;
      phone: boolean;
    };
    canSubmit: boolean;
  };
  guarantee: boolean;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  /** Phone from the User record (not TradespersonProfile) */
  phone?: string | null;
  /** Email from the User record */
  email?: string | null;
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
  documents: Array<{
    id: string;
    fileUrl: string;
    fileName: string;
    mimeType: string;
    createdAt: string;
  }>;
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
