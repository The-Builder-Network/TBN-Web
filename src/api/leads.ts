import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "./client";
import type {
  PaginatedResponse,
  LeadSummary,
  LeadDetail,
  LeadTab,
  CreditRequestReason,
  SortOrder,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL

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

// ── Authenticated ────────────────────────────────────────────

export interface GetLeadsParams {
  tab?: LeadTab;
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

export interface ExpressInterestData {
  leadId: string;
  message: string;
  quoteAmountPence?: number;
  estimateRange?: string;
}

export async function expressInterest(data: ExpressInterestData) {
  const { leadId, ...body } = data;
  const res = await api.post<{
    leadStatus: "INTERESTED";
    creditsReserved: number;
    balance: number;
    reserved: number;
  }>(`/leads/${leadId}/express-interest`, body);
  return res.data;
}

// ── Query keys ──────────────────────────────────────────────

export const leadKeys = {
  all: ["leads"] as const,
  list: (params: GetLeadsParams) => ["leads", "list", params] as const,
  summary: ["leads", "summary"] as const,
  detail: (id: string) => ["leads", "detail", id] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function useLeads(params: GetLeadsParams = {}) {
  return useQuery({
    queryKey: leadKeys.list(params),
    queryFn: () => getLeads(params),
  });
}

export function useLeadSummary() {
  return useQuery({
    queryKey: leadKeys.summary,
    queryFn: async () =>
      (await api.get<Record<LeadTab, number>>("/leads/summary")).data,
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: () => getLead(id),
    enabled: !!id,
  });
}

/** Lead actions refresh the lead, the lists and the credit balance. */
function useLeadAction<V extends { leadId: string }>(fn: (vars: V) => Promise<unknown>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: leadKeys.all });
      void qc.invalidateQueries({ queryKey: ["payments"] });
    },
    onSettled: (_d, _e, { leadId }) =>
      void qc.invalidateQueries({ queryKey: leadKeys.detail(leadId) }),
  });
}

export const useExpressInterest = () => useLeadAction(expressInterest);

export const useWithdrawInterest = () =>
  useLeadAction(({ leadId }: { leadId: string }) => api.post(`/leads/${leadId}/withdraw`));

export const useDismissLead = () =>
  useLeadAction(({ leadId }: { leadId: string }) => api.post(`/leads/${leadId}/dismiss`));

export const useUpsertQuote = () =>
  useLeadAction(
    ({ leadId, ...body }: { leadId: string; message: string; amountPence?: number; estimateRange?: string }) =>
      api.put(`/leads/${leadId}/quote`, body),
  );

export const useRequestReview = () =>
  useLeadAction(({ leadId }: { leadId: string }) => api.post(`/leads/${leadId}/request-review`));

export const useCreditRequest = () =>
  useLeadAction(
    ({ leadId, ...body }: { leadId: string; reason: CreditRequestReason; details: string }) =>
      api.post(`/leads/${leadId}/credit-request`, body),
  );
