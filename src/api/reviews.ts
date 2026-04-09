import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
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
