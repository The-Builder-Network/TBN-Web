import { useQuery } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, SortOrder } from "./types";

// ── Types ───────────────────────────────────────────────────

export interface TradespersonSearchResult {
  userId: string;
  username: string;
  name: string;
  avatarUrl: string | null;
  companyName: string | null;
  trade: string | null;
  bio: string | null;
  postcode: string | null;
  avgRating: number;
  reviewCount: number;
  completedJobs: number;
  verified: boolean;
  guarantee: boolean;
  services: string[];
}

interface SearchTradespeopleParams {
  query?: string;
  serviceSlug?: string;
  postcode?: string;
  radiusMiles?: number;
  guarantee?: boolean;
  page?: number;
  perPage?: number;
  sort?: "rating" | "reviewCount" | "completedJobs";
  order?: SortOrder;
}

// ── API functions ───────────────────────────────────────────

export async function searchTradespeople(
  params: SearchTradespeopleParams = {},
): Promise<PaginatedResponse<TradespersonSearchResult>> {
  const res = await api.get<PaginatedResponse<TradespersonSearchResult>>(
    "/search/tradespeople",
    { params },
  );
  return res.data;
}

// ── Query keys ──────────────────────────────────────────────

export const searchKeys = {
  tradespeople: (params: SearchTradespeopleParams) =>
    ["search", "tradespeople", params] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function useSearchTradespeople(params: SearchTradespeopleParams = {}) {
  return useQuery({
    queryKey: searchKeys.tradespeople(params),
    queryFn: () => searchTradespeople(params),
    enabled: true,
  });
}
