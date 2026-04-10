import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type {
  PaginatedResponse,
  JobSummary,
  JobDetail,
  SortOrder,
} from "./types";

// ── API functions ─────────────────────────────────────────────

interface CreateJobData {
  title: string;
  description?: string;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  answersJson?: Record<string, unknown>;
  attachments?: File[];
}

interface CreateJobResponse {
  id: string;
  jobNumber: number;
  status: string;
  matchedCount: number;
  createdAt: string;
}

export async function createJob(
  data: CreateJobData,
): Promise<CreateJobResponse> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description || data.title);
  formData.append("serviceSlug", data.serviceSlug);
  if (data.tradeSlug) formData.append("tradeSlug", data.tradeSlug);
  formData.append("postcode", data.postcode);
  if (data.answersJson) {
    formData.append("answersJson", JSON.stringify(data.answersJson));
  }
  if (data.attachments) {
    data.attachments.forEach((file) => formData.append("attachments", file));
  }

  const res = await api.post<CreateJobResponse>("/jobs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

interface GetJobsParams {
  status?: string;
  sort?: string;
  order?: SortOrder;
  page?: number;
  perPage?: number;
}

export async function getJobs(
  params: GetJobsParams = {},
): Promise<PaginatedResponse<JobSummary>> {
  const res = await api.get<PaginatedResponse<JobSummary>>("/jobs", { params });
  return res.data;
}

export async function getJob(id: string): Promise<JobDetail> {
  const res = await api.get<JobDetail>(`/jobs/${id}`);
  return res.data;
}

export async function updateJobStatus(
  id: string,
  status: "CANCELLED" | "CLOSED",
): Promise<void> {
  await api.patch(`/jobs/${id}`, { status });
}

export async function completeJob(
  id: string,
  tradespersonId: string,
): Promise<void> {
  await api.post(`/jobs/${id}/complete`, { tradespersonId });
}

// ── Query keys ────────────────────────────────────────────────

export const jobKeys = {
  all: ["jobs"] as const,
  list: (params: GetJobsParams) => ["jobs", "list", params] as const,
  detail: (id: string) => ["jobs", "detail", id] as const,
};

// ── Hooks ─────────────────────────────────────────────────────

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
      void qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useUpdateJobStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "CANCELLED" | "CLOSED";
    }) => updateJobStatus(id, status),
    onSuccess: (_data, { id }) => {
      void qc.invalidateQueries({ queryKey: jobKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useCompleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      tradespersonId,
    }: {
      id: string;
      tradespersonId: string;
    }) => completeJob(id, tradespersonId),
    onSuccess: (_data, { id }) => {
      void qc.invalidateQueries({ queryKey: jobKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}
