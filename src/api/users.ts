import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { PublicProfile, OwnTradespersonProfile } from "./types";

// ── API functions ───────────────────────────────────────────

export async function getPublicProfile(
  username: string,
): Promise<PublicProfile> {
  const res = await api.get<PublicProfile>(`/users/${username}`);
  return res.data;
}

export async function getMyProfile(): Promise<OwnTradespersonProfile> {
  const res = await api.get<OwnTradespersonProfile>("/users/me/profile");
  return res.data;
}

export async function updateMyProfile(
  data: Partial<{
    companyName: string;
    bio: string;
    trade: string;
    postcode: string;
    workRadiusMiles: number;
    guarantee: boolean;
    responseTime: string;
    professions: string[];
    businessType: string;
  }>,
): Promise<OwnTradespersonProfile> {
  const res = await api.patch<OwnTradespersonProfile>(
    "/users/me/profile",
    data,
  );
  return res.data;
}

export async function updateUser(data: {
  name?: string;
  phone?: string;
}): Promise<void> {
  await api.patch("/users/me", data);
}

export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const fd = new FormData();
  fd.append("avatar", file);
  const res = await api.post<{ avatarUrl: string }>("/users/me/avatar", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function uploadIdDocument(file: File): Promise<void> {
  const fd = new FormData();
  fd.append("document", file);
  await api.post("/users/me/id-document", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function addService(data: {
  serviceSlug: string;
  tradeSlug?: string;
}): Promise<void> {
  await api.post("/users/me/services", data);
}

export async function removeService(id: string): Promise<void> {
  await api.delete(`/users/me/services/${id}`);
}

export async function addQualification(data: {
  name: string;
  year?: number;
}): Promise<void> {
  await api.post("/users/me/qualifications", data);
}

export async function removeQualification(id: string): Promise<void> {
  await api.delete(`/users/me/qualifications/${id}`);
}

export async function uploadPortfolioItem(
  file: File,
  title?: string,
  category?: string,
): Promise<void> {
  const fd = new FormData();
  fd.append("image", file);
  if (title) fd.append("title", title);
  if (category) fd.append("category", category);
  await api.post("/users/me/portfolio", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await api.delete(`/users/me/portfolio/${id}`);
}

export async function createMessageTemplate(data: {
  name: string;
  body: string;
}): Promise<void> {
  await api.post("/users/me/message-templates", data);
}

export async function updateMessageTemplate(
  id: string,
  data: { name?: string; body?: string },
): Promise<void> {
  await api.patch(`/users/me/message-templates/${id}`, data);
}

export async function deleteMessageTemplate(id: string): Promise<void> {
  await api.delete(`/users/me/message-templates/${id}`);
}

// ── Query keys ──────────────────────────────────────────────

export const userKeys = {
  publicProfile: (username: string) => ["users", "public", username] as const,
  myProfile: ["users", "me", "profile"] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: userKeys.publicProfile(username),
    queryFn: () => getPublicProfile(username),
    enabled: !!username,
  });
}

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.myProfile,
    queryFn: getMyProfile,
  });
}

export function useUpdateMyProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: userKeys.myProfile });
    },
  });
}

export function useUploadAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["auth", "me"] });
      void qc.invalidateQueries({ queryKey: userKeys.myProfile });
    },
  });
}

export function useUploadIdDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadIdDocument,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: userKeys.myProfile });
    },
  });
}

export function useAddService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addService,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useRemoveService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeService,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useAddQualification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addQualification,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useRemoveQualification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeQualification,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useUploadPortfolio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      title,
      category,
    }: {
      file: File;
      title?: string;
      category?: string;
    }) => uploadPortfolioItem(file, title, category),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useDeletePortfolioItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePortfolioItem,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useCreateMessageTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createMessageTemplate,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useUpdateMessageTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; body?: string };
    }) => updateMessageTemplate(id, data),
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}

export function useDeleteMessageTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMessageTemplate,
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: userKeys.myProfile }),
  });
}
