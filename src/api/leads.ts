import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "./client";
import type { PaginatedResponse, LeadSummary, LeadDetail, SortOrder } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// ── Public: count available leads near a postcode ────────────

export async function fetchLeadsCount(
  postcode: string,
  radiusMiles: number,
): Promise<number> {
  if (!postcode) return 0;
  const { data } = await axios.get<{ count: number }>(
    `${API_BASE}/leads/count`,
    { params: { postcode, radius: radiusMiles } },
  );
  return data.count;
}

export function useLeadsCount(postcode: string, radiusMiles: number) {
  return useQuery({
    queryKey: ["leads", "count", postcode, radiusMiles],
    queryFn: () => fetchLeadsCount(postcode, radiusMiles),
    enabled: !!postcode && postcode.length >= 5,
    staleTime: 60_000,
    placeholderData: 0,
  });
}

// ── Authenticated: CRUD ──────────────────────────────────────

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

// ── Query keys ──────────────────────────────────────────────

export const leadKeys = {
  all: ["leads"] as const,
  list: (params: GetLeadsParams) => ["leads", "list", params] as const,
  detail: (id: string) => ["leads", "detail", id] as const,
};

// ── Hooks ───────────────────────────────────────────────────

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
      void qc.invalidateQueries({ queryKey: leadKeys.detail(leadId) });
      void qc.invalidateQueries({ queryKey: leadKeys.all });
      void qc.invalidateQueries({ queryKey: ["payments", "balance"] });
    },
  });
}
