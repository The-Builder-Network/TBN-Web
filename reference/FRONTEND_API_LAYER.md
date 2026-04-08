# Builder Network — Frontend API Layer

> All files go in `src/api/`. Each file exports typed functions + React Query hooks.

---

## src/api/client.ts

```typescript
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ── Token storage ───────────────────────────────────────────
const TOKEN_KEY = "tbn_access_token";
const REFRESH_KEY = "tbn_refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem(TOKEN_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// ── Request interceptor: attach Bearer token ────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: refresh on 401 ────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem(REFRESH_KEY);
      if (!refreshToken) throw new Error("No refresh token");

      const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
      setTokens(data.accessToken, data.refreshToken);
      processQueue(null, data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      window.location.href = "/?session_expired=true";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ── Typed error extractor ───────────────────────────────────
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export function extractError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message;
  }
  return "An unexpected error occurred";
}
```

---

## src/api/types.ts

```typescript
// ── Shared API types ────────────────────────────────────────

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

export type JobStatus = "DRAFT" | "ACTIVE" | "SHORTLISTING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "CLOSED";

export type LeadStatus = "AVAILABLE" | "INTERESTED" | "SHORTLISTED" | "CONTACTED" | "HIRED" | "REJECTED" | "EXPIRED";

export type QuoteStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN";

export type NotificationType =
  | "NEW_LEAD" | "NEW_INTEREST" | "NEW_QUOTE" | "NEW_MESSAGE"
  | "NEW_REVIEW" | "JOB_COMPLETED" | "JOB_CANCELLED" | "LEAD_EXPIRED"
  | "CREDIT_LOW" | "CREDIT_TOPUP" | "ACCOUNT_VERIFIED"
  | "NEW_ANSWER" | "ANSWER_LIKED";

// ── User ────────────────────────────────────────────────────
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

// ── Job ─────────────────────────────────────────────────────
export interface JobSummary {
  id: string;
  title: string;
  status: JobStatus;
  serviceSlug: string;
  postcode: string;
  placeName?: string;
  interestedCount: number;
  quoteCount: number;
  newResponsesCount: number;
  createdAt: string;
}

export interface JobDetail {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  placeName?: string;
  answersJson: Record<string, unknown>;
  attachments: Array<{ id: string; fileUrl: string; fileName: string }>;
  interestedCount: number;
  quoteCount: number;
  createdAt: string;
  responses?: JobResponse[];
}

export interface JobResponse {
  tradesperson: {
    id: string;
    username: string;
    name: string;
    companyName?: string;
    avatarUrl?: string;
    avgRating: number;
    reviewCount: number;
    verified: boolean;
  };
  lead: { id: string; status: LeadStatus; interestedAt?: string };
  quote?: { id: string; message: string; amountPence?: number; status: QuoteStatus };
}

// ── Lead ────────────────────────────────────────────────────
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
  quote?: { id: string; message: string; amountPence?: number; status: QuoteStatus };
}

// ── Quote ───────────────────────────────────────────────────
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

// ── Conversation & Message ──────────────────────────────────
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

// ── Review ──────────────────────────────────────────────────
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

// ── Question & Answer ───────────────────────────────────────
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

// ── Notification ────────────────────────────────────────────
export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  linkUrl?: string;
  read: boolean;
  createdAt: string;
}

// ── Payments ────────────────────────────────────────────────
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

// ── Public Profile ──────────────────────────────────────────
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
  portfolioItems: Array<{ id: string; imageUrl: string; title?: string; category?: string }>;
  ratingBreakdown: Record<string, number>;
  reviews: ReviewItem[];
}

// ── Tradesperson Profile (own) ──────────────────────────────
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
  qualifications: Array<{ id: string; name: string; verified: boolean; year?: number }>;
  portfolioItems: Array<{ id: string; imageUrl: string; title?: string; category?: string }>;
  insurance: {
    publicLiability?: string;
    employersLiability?: string;
    professionalIndemnity?: string;
    verified: boolean;
    expiresAt?: string;
  };
  messageTemplates: Array<{ id: string; name: string; body: string }>;
}

// ── Search ──────────────────────────────────────────────────
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
```

---

## src/api/auth.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, setTokens, clearTokens, extractError } from "./client";
import type { AuthUser } from "./types";

// ── API functions ───────────────────────────────────────────

interface LoginRequest { email: string; password: string }
interface RegisterRequest { email: string; password: string; name: string; role: "HOMEOWNER" | "TRADESPERSON"; phone?: string }
interface LoginResponse { user: AuthUser; accessToken: string; refreshToken: string }

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", data);
  setTokens(res.data.accessToken, res.data.refreshToken);
  return res.data;
}

export async function registerApi(data: RegisterRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/register", data);
  setTokens(res.data.accessToken, res.data.refreshToken);
  return res.data;
}

export async function fetchMe(): Promise<AuthUser> {
  const res = await api.get<AuthUser>("/auth/me");
  return res.data;
}

export async function logoutApi(): Promise<void> {
  clearTokens();
}

export async function forgotPasswordApi(email: string): Promise<void> {
  await api.post("/auth/forgot-password", { email });
}

export async function resetPasswordApi(token: string, newPassword: string): Promise<void> {
  await api.post("/auth/reset-password", { token, newPassword });
}

export async function verifyEmailApi(token: string): Promise<void> {
  await api.post("/auth/verify-email", { token });
}

// ── React Query hooks ───────────────────────────────────────

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useMe() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      qc.setQueryData(authKeys.me, data.user);
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      qc.setQueryData(authKeys.me, data.user);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      qc.setQueryData(authKeys.me, null);
      qc.clear();
    },
  });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: forgotPasswordApi });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      resetPasswordApi(token, newPassword),
  });
}
```

---

## src/api/jobs.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, JobSummary, JobDetail, SortOrder } from "./types";

// ── API functions ───────────────────────────────────────────

interface CreateJobData {
  title: string;
  description: string;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  answersJson: Record<string, unknown>;
  attachments?: File[];
}

interface CreateJobResponse {
  id: string;
  title: string;
  status: "ACTIVE";
  matchedCount: number;
  createdAt: string;
}

export async function createJob(data: CreateJobData): Promise<CreateJobResponse> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("serviceSlug", data.serviceSlug);
  if (data.tradeSlug) formData.append("tradeSlug", data.tradeSlug);
  formData.append("postcode", data.postcode);
  formData.append("answersJson", JSON.stringify(data.answersJson));
  data.attachments?.forEach((file) => formData.append("attachments", file));

  const res = await api.post<CreateJobResponse>("/jobs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

interface GetJobsParams {
  status?: string;
  page?: number;
  perPage?: number;
  sort?: string;
  order?: SortOrder;
}

export async function getJobs(params: GetJobsParams = {}): Promise<PaginatedResponse<JobSummary>> {
  const res = await api.get<PaginatedResponse<JobSummary>>("/jobs", { params });
  return res.data;
}

export async function getJob(id: string): Promise<JobDetail> {
  const res = await api.get<JobDetail>(`/jobs/${id}`);
  return res.data;
}

export async function updateJobStatus(id: string, status: "CANCELLED" | "CLOSED"): Promise<void> {
  await api.patch(`/jobs/${id}`, { status });
}

export async function completeJob(id: string, tradespersonId: string): Promise<void> {
  await api.post(`/jobs/${id}/complete`, { tradespersonId });
}

// ── Query keys ──────────────────────────────────────────────

export const jobKeys = {
  all: ["jobs"] as const,
  list: (params: GetJobsParams) => ["jobs", "list", params] as const,
  detail: (id: string) => ["jobs", "detail", id] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function useJobs(params: GetJobsParams = {}) {
  return useQuery({
    queryKey: jobKeys.list(params),
    queryFn: () => getJobs(params),
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => getJob(id),
    enabled: !!id,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useUpdateJobStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "CANCELLED" | "CLOSED" }) =>
      updateJobStatus(id, status),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: jobKeys.detail(id) });
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useCompleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, tradespersonId }: { id: string; tradespersonId: string }) =>
      completeJob(id, tradespersonId),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: jobKeys.detail(id) });
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}
```

---

## src/api/leads.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, LeadSummary, LeadDetail, SortOrder } from "./types";

interface GetLeadsParams {
  status?: string;
  serviceSlug?: string;
  maxDistanceMiles?: number;
  page?: number;
  perPage?: number;
  sort?: "createdAt" | "distanceMiles" | "creditCost";
  order?: SortOrder;
}

export async function getLeads(params: GetLeadsParams = {}): Promise<PaginatedResponse<LeadSummary>> {
  const res = await api.get<PaginatedResponse<LeadSummary>>("/leads", { params });
  return res.data;
}

export async function getLead(id: string): Promise<LeadDetail> {
  const res = await api.get<LeadDetail>(`/leads/${id}`);
  return res.data;
}

interface ExpressInterestData {
  leadId: string;
  message: string;
  quoteAmountPence?: number;
}

interface ExpressInterestResponse {
  leadStatus: "INTERESTED";
  creditsDeducted: number;
  newBalance: number;
  quoteId?: string;
}

export async function expressInterest(data: ExpressInterestData): Promise<ExpressInterestResponse> {
  const res = await api.post<ExpressInterestResponse>(`/leads/${data.leadId}/express-interest`, {
    message: data.message,
    quoteAmountPence: data.quoteAmountPence,
  });
  return res.data;
}

export const leadKeys = {
  all: ["leads"] as const,
  list: (params: GetLeadsParams) => ["leads", "list", params] as const,
  detail: (id: string) => ["leads", "detail", id] as const,
};

export function useLeads(params: GetLeadsParams = {}) {
  return useQuery({
    queryKey: leadKeys.list(params),
    queryFn: () => getLeads(params),
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: () => getLead(id),
    enabled: !!id,
  });
}

export function useExpressInterest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: expressInterest,
    onSuccess: (_, { leadId }) => {
      qc.invalidateQueries({ queryKey: leadKeys.detail(leadId) });
      qc.invalidateQueries({ queryKey: leadKeys.all });
      qc.invalidateQueries({ queryKey: ["payments", "balance"] });
    },
  });
}
```

---

## src/api/users.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PublicProfile, OwnTradespersonProfile } from "./types";

export async function getPublicProfile(username: string): Promise<PublicProfile> {
  const res = await api.get<PublicProfile>(`/users/${username}`);
  return res.data;
}

export async function getMyProfile(): Promise<OwnTradespersonProfile> {
  const res = await api.get<OwnTradespersonProfile>("/users/me/profile");
  return res.data;
}

export async function updateMyProfile(data: Partial<{
  companyName: string;
  bio: string;
  trade: string;
  postcode: string;
  workRadiusMiles: number;
  guarantee: boolean;
}>): Promise<OwnTradespersonProfile> {
  const res = await api.patch<OwnTradespersonProfile>("/users/me/profile", data);
  return res.data;
}

export async function updateUser(data: { name?: string; phone?: string }): Promise<void> {
  await api.patch("/users/me", data);
}

export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const fd = new FormData();
  fd.append("avatar", file);
  const res = await api.post<{ avatarUrl: string }>("/users/me/avatar", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function uploadIdDocument(file: File): Promise<void> {
  const fd = new FormData();
  fd.append("document", file);
  await api.post("/users/me/id-document", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function addService(data: { serviceSlug: string; tradeSlug?: string }): Promise<void> {
  await api.post("/users/me/services", data);
}

export async function removeService(id: string): Promise<void> {
  await api.delete(`/users/me/services/${id}`);
}

export async function addQualification(data: { name: string; year?: number }): Promise<void> {
  await api.post("/users/me/qualifications", data);
}

export async function removeQualification(id: string): Promise<void> {
  await api.delete(`/users/me/qualifications/${id}`);
}

export async function uploadPortfolioItem(file: File, title?: string, category?: string): Promise<void> {
  const fd = new FormData();
  fd.append("image", file);
  if (title) fd.append("title", title);
  if (category) fd.append("category", category);
  await api.post("/users/me/portfolio", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await api.delete(`/users/me/portfolio/${id}`);
}

export async function createMessageTemplate(data: { name: string; body: string }): Promise<void> {
  await api.post("/users/me/message-templates", data);
}

export async function deleteMessageTemplate(id: string): Promise<void> {
  await api.delete(`/users/me/message-templates/${id}`);
}

// ── Query keys ──────────────────────────────────────────────

export const userKeys = {
  publicProfile: (username: string) => ["users", "public", username] as const,
  myProfile: ["users", "me", "profile"] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: userKeys.publicProfile(username),
    queryFn: () => getPublicProfile(username),
    enabled: !!username,
  });
}

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.myProfile,
    queryFn: getMyProfile,
  });
}

export function useUpdateMyProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.myProfile });
    },
  });
}

export function useUploadAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
      qc.invalidateQueries({ queryKey: userKeys.myProfile });
    },
  });
}

export function useUploadIdDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadIdDocument,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.myProfile });
    },
  });
}

export function useAddService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addService,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useRemoveService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeService,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useUploadPortfolio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, title, category }: { file: File; title?: string; category?: string }) =>
      uploadPortfolioItem(file, title, category),
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}
```

---

## src/api/quotes.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { QuoteSummary } from "./types";

export async function getQuotes(jobId: string): Promise<{ quotes: QuoteSummary[] }> {
  const res = await api.get<{ quotes: QuoteSummary[] }>(`/jobs/${jobId}/quotes`);
  return res.data;
}

export async function acceptQuote(quoteId: string): Promise<void> {
  await api.patch(`/quotes/${quoteId}/accept`);
}

export async function declineQuote(quoteId: string): Promise<void> {
  await api.patch(`/quotes/${quoteId}/decline`);
}

export async function updateQuote(quoteId: string, data: { message?: string; amountPence?: number }): Promise<void> {
  await api.patch(`/quotes/${quoteId}`, data);
}

export async function withdrawQuote(quoteId: string): Promise<void> {
  await api.delete(`/quotes/${quoteId}`);
}

export const quoteKeys = {
  forJob: (jobId: string) => ["quotes", "job", jobId] as const,
};

export function useQuotes(jobId: string) {
  return useQuery({
    queryKey: quoteKeys.forJob(jobId),
    queryFn: () => getQuotes(jobId),
    enabled: !!jobId,
  });
}

export function useAcceptQuote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: acceptQuote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quotes"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useDeclineQuote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: declineQuote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quotes"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
```

---

## src/api/messaging.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, ConversationSummary, MessageItem } from "./types";

export async function getConversations(): Promise<{ conversations: ConversationSummary[] }> {
  const res = await api.get<{ conversations: ConversationSummary[] }>("/conversations");
  return res.data;
}

export async function getMessages(conversationId: string, page = 1): Promise<PaginatedResponse<MessageItem>> {
  const res = await api.get<PaginatedResponse<MessageItem>>(`/conversations/${conversationId}/messages`, {
    params: { page, perPage: 50 },
  });
  return res.data;
}

export async function sendMessage(conversationId: string, body: string): Promise<MessageItem> {
  const res = await api.post<MessageItem>(`/conversations/${conversationId}/messages`, { body });
  return res.data;
}

export const messagingKeys = {
  conversations: ["conversations"] as const,
  messages: (conversationId: string) => ["messages", conversationId] as const,
};

export function useConversations() {
  return useQuery({
    queryKey: messagingKeys.conversations,
    queryFn: getConversations,
  });
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: messagingKeys.messages(conversationId),
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
    refetchInterval: 10_000, // poll every 10s until WS is implemented
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, body }: { conversationId: string; body: string }) =>
      sendMessage(conversationId, body),
    onSuccess: (_, { conversationId }) => {
      qc.invalidateQueries({ queryKey: messagingKeys.messages(conversationId) });
      qc.invalidateQueries({ queryKey: messagingKeys.conversations });
    },
  });
}
```

---

## src/api/reviews.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, ReviewItem } from "./types";

interface CreateReviewData {
  jobId: string;
  tradespersonId: string;
  rating: number;
  comment: string;
}

export async function createReview(data: CreateReviewData): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>("/reviews", data);
  return res.data;
}

export async function getReviews(tradespersonId: string, page = 1): Promise<PaginatedResponse<ReviewItem>> {
  const res = await api.get<PaginatedResponse<ReviewItem>>("/reviews", {
    params: { tradespersonId, page, perPage: 10 },
  });
  return res.data;
}

export async function replyToReview(reviewId: string, body: string): Promise<void> {
  await api.post(`/reviews/${reviewId}/reply`, { body });
}

export const reviewKeys = {
  forTradesperson: (id: string) => ["reviews", "tradesperson", id] as const,
};

export function useReviews(tradespersonId: string, page = 1) {
  return useQuery({
    queryKey: [...reviewKeys.forTradesperson(tradespersonId), page],
    queryFn: () => getReviews(tradespersonId, page),
    enabled: !!tradespersonId,
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useReplyToReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, body }: { reviewId: string; body: string }) => replyToReview(reviewId, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
```

---

## src/api/questions.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, QuestionSummary, QuestionDetail, SortOrder } from "./types";

interface GetQuestionsParams {
  serviceSlug?: string;
  page?: number;
  perPage?: number;
  sort?: "createdAt" | "answerCount";
  order?: SortOrder;
}

export async function getQuestions(params: GetQuestionsParams = {}): Promise<PaginatedResponse<QuestionSummary>> {
  const res = await api.get<PaginatedResponse<QuestionSummary>>("/questions", { params });
  return res.data;
}

export async function getQuestion(id: string): Promise<QuestionDetail> {
  const res = await api.get<QuestionDetail>(`/questions/${id}`);
  return res.data;
}

export async function createQuestion(data: { title: string; body: string; serviceSlug?: string }): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>("/questions", data);
  return res.data;
}

export async function createAnswer(questionId: string, body: string): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>(`/questions/${questionId}/answers`, { body });
  return res.data;
}

export async function toggleAnswerLike(answerId: string): Promise<{ liked: boolean; likesCount: number }> {
  const res = await api.post<{ liked: boolean; likesCount: number }>(`/answers/${answerId}/like`);
  return res.data;
}

export async function markBestAnswer(answerId: string): Promise<void> {
  await api.patch(`/answers/${answerId}/best`);
}

export const questionKeys = {
  all: ["questions"] as const,
  list: (params: GetQuestionsParams) => ["questions", "list", params] as const,
  detail: (id: string) => ["questions", "detail", id] as const,
};

export function useQuestions(params: GetQuestionsParams = {}) {
  return useQuery({
    queryKey: questionKeys.list(params),
    queryFn: () => getQuestions(params),
  });
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: questionKeys.detail(id),
    queryFn: () => getQuestion(id),
    enabled: !!id,
  });
}

export function useCreateQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => qc.invalidateQueries({ queryKey: questionKeys.all }),
  });
}

export function useCreateAnswer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, body }: { questionId: string; body: string }) =>
      createAnswer(questionId, body),
    onSuccess: (_, { questionId }) => {
      qc.invalidateQueries({ queryKey: questionKeys.detail(questionId) });
      qc.invalidateQueries({ queryKey: questionKeys.all });
    },
  });
}

export function useToggleAnswerLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleAnswerLike,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["questions"] }),
  });
}
```

---

## src/api/payments.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, BalanceInfo, PaymentItem } from "./types";

export async function getBalance(): Promise<BalanceInfo> {
  const res = await api.get<BalanceInfo>("/payments/balance");
  return res.data;
}

export async function createCheckout(creditAmount: number): Promise<{ checkoutUrl: string; sessionId: string }> {
  const res = await api.post<{ checkoutUrl: string; sessionId: string }>("/payments/checkout", { creditAmount });
  return res.data;
}

export async function getPaymentHistory(page = 1): Promise<PaginatedResponse<PaymentItem>> {
  const res = await api.get<PaginatedResponse<PaymentItem>>("/payments/history", {
    params: { page, perPage: 20 },
  });
  return res.data;
}

export async function updateAutoTopup(data: {
  enabled: boolean;
  topupAmount?: number;
  topupThreshold?: number;
}): Promise<BalanceInfo> {
  const res = await api.patch<BalanceInfo>("/payments/auto-topup", data);
  return res.data;
}

export const paymentKeys = {
  balance: ["payments", "balance"] as const,
  history: (page: number) => ["payments", "history", page] as const,
};

export function useBalance() {
  return useQuery({
    queryKey: paymentKeys.balance,
    queryFn: getBalance,
  });
}

export function usePaymentHistory(page = 1) {
  return useQuery({
    queryKey: paymentKeys.history(page),
    queryFn: () => getPaymentHistory(page),
  });
}

export function useCreateCheckout() {
  return useMutation({
    mutationFn: createCheckout,
    onSuccess: (data) => {
      window.location.href = data.checkoutUrl;
    },
  });
}

export function useUpdateAutoTopup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAutoTopup,
    onSuccess: () => qc.invalidateQueries({ queryKey: paymentKeys.balance }),
  });
}
```

---

## src/api/notifications.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, NotificationItem } from "./types";

export async function getNotifications(page = 1, unreadOnly = false): Promise<PaginatedResponse<NotificationItem>> {
  const res = await api.get<PaginatedResponse<NotificationItem>>("/notifications", {
    params: { page, perPage: 20, unreadOnly },
  });
  return res.data;
}

export async function getUnreadCount(): Promise<{ count: number }> {
  const res = await api.get<{ count: number }>("/notifications/unread-count");
  return res.data;
}

export async function markRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllRead(): Promise<void> {
  await api.post("/notifications/read-all");
}

export const notificationKeys = {
  all: ["notifications"] as const,
  list: (page: number) => ["notifications", "list", page] as const,
  unreadCount: ["notifications", "unread-count"] as const,
};

export function useNotifications(page = 1) {
  return useQuery({
    queryKey: notificationKeys.list(page),
    queryFn: () => getNotifications(page),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount,
    queryFn: getUnreadCount,
    refetchInterval: 30_000, // poll every 30s until WS
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.all });
      qc.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.all });
      qc.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}
```

---

## src/api/search.ts

```typescript
import { useQuery } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, TradespersonSearchResult, SortOrder } from "./types";

interface SearchParams {
  serviceSlug?: string;
  tradeSlug?: string;
  postcode?: string;
  radiusMiles?: number;
  minRating?: number;
  verified?: boolean;
  page?: number;
  perPage?: number;
  sort?: "avgRating" | "reviewCount" | "distanceMiles";
  order?: SortOrder;
}

export async function searchTradespeople(params: SearchParams): Promise<PaginatedResponse<TradespersonSearchResult>> {
  const res = await api.get<PaginatedResponse<TradespersonSearchResult>>("/search/tradespeople", { params });
  return res.data;
}

export const searchKeys = {
  tradespeople: (params: SearchParams) => ["search", "tradespeople", params] as const,
};

export function useSearchTradespeople(params: SearchParams, enabled = true) {
  return useQuery({
    queryKey: searchKeys.tradespeople(params),
    queryFn: () => searchTradespeople(params),
    enabled,
  });
}
```

---

## src/api/index.ts

```typescript
// Barrel export for all API modules
export * from "./client";
export * from "./types";
export * from "./auth";
export * from "./jobs";
export * from "./leads";
export * from "./users";
export * from "./quotes";
export * from "./messaging";
export * from "./reviews";
export * from "./questions";
export * from "./payments";
export * from "./notifications";
export * from "./search";
```
