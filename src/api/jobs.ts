import { useMutation } from "@tanstack/react-query";
import { api } from "./client";

// ── Types ─────────────────────────────────────────────────────

export interface CreateJobPayload {
  serviceSlug: string;
  postcode: string;
  answersJson: Record<string, unknown>;
  title?: string;
  description?: string;
}

export interface CreateJobResponse {
  id: string;
  status: string;
  serviceSlug: string;
  postcode: string;
  title: string;
  createdAt: string;
}

// ── API call ──────────────────────────────────────────────────

export async function createJobApi(
  payload: CreateJobPayload,
): Promise<CreateJobResponse> {
  const res = await api.post<CreateJobResponse>("/jobs", payload);
  return res.data;
}

// ── Hook ──────────────────────────────────────────────────────

export function useCreateJob() {
  return useMutation({ mutationFn: createJobApi });
}
