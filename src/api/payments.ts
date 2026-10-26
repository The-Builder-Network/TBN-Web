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

export interface CreditPack {
  credits: number;
  amountPence: number;
  label: string;
  pricePerCredit: string;
  popular?: boolean;
}

export async function getPacks(): Promise<CreditPack[]> {
  const res = await api.get<{ packs: CreditPack[] }>("/payments/packs");
  return res.data.packs;
}

/** Called on the Stripe success page; credits the balance even if the webhook is slow. */
export async function confirmCheckout(sessionId: string) {
  const res = await api.get<{
    status: PaymentItem["status"];
    credits: number | null;
    amountPence: number;
    balance: number;
  }>(`/payments/sessions/${sessionId}`);
  return res.data;
}

export interface LedgerItem {
  id: string;
  type:
    | "WELCOME_BONUS"
    | "PURCHASE"
    | "PURCHASE_REVERSAL"
    | "RESERVE"
    | "RELEASE"
    | "LEAD_FEE"
    | "ADMIN_CREDIT"
    | "ADMIN_DEBIT";
  amount: number;
  reservedChange: number;
  balanceAfter: number;
  reservedAfter: number;
  leadId: string | null;
  note: string | null;
  createdAt: string;
}

export async function getLedger(page = 1): Promise<PaginatedResponse<LedgerItem>> {
  const res = await api.get<PaginatedResponse<LedgerItem>>("/payments/ledger", {
    params: { page, perPage: 20 },
  });
  return res.data;
}

// ── Query keys ──────────────────────────────────────────────

export const paymentKeys = {
  balance: ["payments", "balance"] as const,
  history: (page: number) => ["payments", "history", page] as const,
  ledger: (page: number) => ["payments", "ledger", page] as const,
  packs: ["payments", "packs"] as const,
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

export function usePacks() {
  return useQuery({
    queryKey: paymentKeys.packs,
    queryFn: getPacks,
    staleTime: Infinity,
  });
}

export function useLedger(page = 1) {
  return useQuery({
    queryKey: paymentKeys.ledger(page),
    queryFn: () => getLedger(page),
  });
}

export function useConfirmCheckout(sessionId: string | null) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: ["payments", "session", sessionId],
    queryFn: async () => {
      const r = await confirmCheckout(sessionId!);
      void qc.invalidateQueries({ queryKey: paymentKeys.balance });
      void qc.invalidateQueries({ queryKey: ["payments", "ledger"] });
      void qc.invalidateQueries({ queryKey: ["payments", "history"] });
      return r;
    },
    enabled: !!sessionId,
    // Async payment methods can stay PENDING briefly: poll until settled.
    refetchInterval: (q) => (q.state.data?.status === "PENDING" ? 3000 : false),
    retry: 1,
  });
}
