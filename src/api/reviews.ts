import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "./client";
import { useSearchTradespeople, type TradespersonSearchResult } from "./search";
import type { PaginatedResponse, ReviewItem } from "./types";

// ── API functions ───────────────────────────────────────────

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

export async function getReviews(
  tradespersonId: string,
  page = 1,
): Promise<PaginatedResponse<ReviewItem>> {
  const res = await api.get<PaginatedResponse<ReviewItem>>("/reviews", {
    params: { tradespersonId, page, perPage: 10 },
  });
  return res.data;
}

export async function replyToReview(reviewId: string, body: string): Promise<void> {
  await api.post(`/reviews/${reviewId}/reply`, { body });
}

// ── Query keys ──────────────────────────────────────────────

export const reviewKeys = {
  forTradesperson: (id: string) => ["reviews", "tradesperson", id] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function useReviews(tradespersonId: string, page = 1) {
  return useQuery({
    queryKey: [...reviewKeys.forTradesperson(tradespersonId), page],
    queryFn: () => getReviews(tradespersonId, page),
    enabled: !!tradespersonId,
  });
}

export interface FeaturedReview extends ReviewItem {
  tradesperson: TradespersonSearchResult;
}

/**
 * Latest real review from each of the most-reviewed verified tradespeople.
 * There is no platform-wide reviews endpoint, so this composes the public
 * search + per-tradesperson reviews endpoints. Empty while loading or on error.
 */
export function useFeaturedReviews(limit = 3): FeaturedReview[] {
  const { data: pros } = useSearchTradespeople({
    sort: "reviewCount",
    order: "desc",
    perPage: limit,
  });
  const reviewed = (pros?.data ?? []).filter((p) => p.reviewCount > 0);

  const results = useQueries({
    queries: reviewed.map((p) => ({
      queryKey: [...reviewKeys.forTradesperson(p.userId), 1],
      queryFn: () => getReviews(p.userId),
    })),
  });

  return reviewed.flatMap((tradesperson, i) => {
    const review = results[i]?.data?.data[0];
    return review?.comment ? [{ ...review, tradesperson }] : [];
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["reviews"] });
      void qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useReplyToReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, body }: { reviewId: string; body: string }) =>
      replyToReview(reviewId, body),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
