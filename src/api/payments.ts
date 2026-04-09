import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PaginatedResponse, BalanceInfo, PaymentItem } from "./types";

// ── API functions ───────────────────────────────────────────

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

// ── Query keys ──────────────────────────────────────────────

export const paymentKeys = {
  balance: ["payments", "balance"] as const,
  history: (page: number) => ["payments", "history", page] as const,
};

// ── Hooks ───────────────────────────────────────────────────

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
    onSuccess: () => void qc.invalidateQueries({ queryKey: paymentKeys.balance }),
  });
}
