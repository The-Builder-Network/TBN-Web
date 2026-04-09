import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { QuoteStatus } from "./types";

// ── Types ───────────────────────────────────────────────────

export interface QuoteItem {
  id: string;
  message: string;
  amountPence: number | null;
  estimateRange: string | null;
  status: QuoteStatus;
  createdAt: string;
  tradesperson: {
    id: string;
    name: string;
    avatarUrl: string | null;
    username?: string;
    companyName?: string;
    avgRating?: number;
    reviewCount?: number;
    completedJobs?: number;
  };
}

export interface QuotesListResponse {
  quotes: QuoteItem[];
}

// ── API functions ───────────────────────────────────────────

export async function getQuotesForJob(
  jobId: string,
): Promise<QuotesListResponse> {
  const res = await api.get<QuotesListResponse>(`/jobs/${jobId}/quotes`);
  return res.data;
}

export async function updateQuoteStatus(
  quoteId: string,
  status: "ACCEPTED" | "DECLINED" | "WITHDRAWN",
): Promise<void> {
  await api.patch(`/quotes/${quoteId}`, { status });
}

// ── Query keys ──────────────────────────────────────────────

export const quoteKeys = {
  forJob: (jobId: string) => ["quotes", "job", jobId] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function useQuotesForJob(jobId: string) {
  return useQuery({
    queryKey: quoteKeys.forJob(jobId),
    queryFn: () => getQuotesForJob(jobId),
    enabled: !!jobId,
  });
}

export function useAcceptQuote(jobId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) => updateQuoteStatus(quoteId, "ACCEPTED"),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: quoteKeys.forJob(jobId) });
      void qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useDeclineQuote(jobId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) => updateQuoteStatus(quoteId, "DECLINED"),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: quoteKeys.forJob(jobId) });
    },
  });
}

export function useWithdrawQuote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) => updateQuoteStatus(quoteId, "WITHDRAWN"),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}
