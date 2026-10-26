import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type {
  PaginatedResponse,
  JobSummary,
  JobDetail,
  JobAnswer,
  SortOrder,
} from "./types";

// ── API functions ─────────────────────────────────────────────

export interface CreateJobData {
  title: string;
  description: string;
  serviceSlug: string;
  tradeSlug?: string;
  postcode: string;
  answers?: JobAnswer[];
  attachments?: File[];
  /** Tradesperson username to invite straight away ("Request a quote"). */
  inviteUsername?: string;
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
  formData.append("description", data.description);
  formData.append("serviceSlug", data.serviceSlug);
  if (data.tradeSlug) formData.append("tradeSlug", data.tradeSlug);
  formData.append("postcode", data.postcode);
  if (data.answers?.length) {
    formData.append("answers", JSON.stringify(data.answers));
  }
  if (data.inviteUsername) formData.append("inviteUsername", data.inviteUsername);
  data.attachments?.forEach((file) => formData.append("attachments", file));

  const res = await api.post<CreateJobResponse>("/jobs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export interface GetJobsParams {
  /** open = ACTIVE + HIRED, closed = COMPLETED + CLOSED + EXPIRED */
  view?: "open" | "closed";
  sort?: "createdAt" | "updatedAt";
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

// ── Query keys ────────────────────────────────────────────────

export const jobKeys = {
  all: ["jobs"] as const,
  list: (params: GetJobsParams) => ["jobs", "list", params] as const,
  detail: (id: string) => ["jobs", "detail", id] as const,
};

// ── Hooks ─────────────────────────────────────────────────────

export function useJobs(params: GetJobsParams = {}, enabled = true) {
  return useQuery({
    queryKey: jobKeys.list(params),
    queryFn: () => getJobs(params),
    enabled,
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

/** Any homeowner action on a job: refreshes the job, the lists and conversations. */
function useJobAction<V>(jobId: string, fn: (vars: V) => Promise<unknown>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: jobKeys.all });
      void qc.invalidateQueries({ queryKey: ["conversations"] });
    },
    onSettled: () => void qc.invalidateQueries({ queryKey: jobKeys.detail(jobId) }),
  });
}

export const useShortlist = (jobId: string) =>
  useJobAction(jobId, (leadId: string) =>
    api.post(`/jobs/${jobId}/leads/${leadId}/shortlist`),
  );

export const useDeclineInterest = (jobId: string) =>
  useJobAction(jobId, ({ leadId, reason }: { leadId: string; reason?: string }) =>
    api.post(`/jobs/${jobId}/leads/${leadId}/decline`, { reason }),
  );

export const useHire = (jobId: string) =>
  useJobAction(jobId, (leadId: string) =>
    api.post(`/jobs/${jobId}/leads/${leadId}/hire`),
  );

export const useCompleteJob = (jobId: string) =>
  useJobAction(jobId, () => api.post(`/jobs/${jobId}/complete`));

export const useCloseJob = (jobId: string) =>
  useJobAction(jobId, (reason?: string) =>
    api.post(`/jobs/${jobId}/close`, { reason }),
  );

export const useUpdateJobDescription = (jobId: string) =>
  useJobAction(jobId, (description: string) =>
    api.patch(`/jobs/${jobId}`, { description }),
  );

export const useAddJobAttachments = (jobId: string) =>
  useJobAction(jobId, (files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("attachments", f));
    return api.post(`/jobs/${jobId}/attachments`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

export const useRemoveJobAttachment = (jobId: string) =>
  useJobAction(jobId, (attachmentId: string) =>
    api.delete(`/jobs/${jobId}/attachments/${attachmentId}`),
  );

/** Invite a tradesperson to an existing open job. */
export async function inviteToJob(jobId: string, username: string) {
  const res = await api.post<{ leadId: string; alreadyInvited: boolean; alreadyResponded?: boolean }>(
    `/jobs/${jobId}/invites`,
    { username },
  );
  return res.data;
}

export const useInviteToJob = (jobId: string) =>
  useJobAction(jobId, (username: string) => inviteToJob(jobId, username));
