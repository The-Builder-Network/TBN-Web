import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, setTokens, clearTokens, getAccessToken } from "./client";
import type { User } from "@/types/auth";

// ── Response shape from /auth/me ─────────────────────────────
export interface ApiUser {
  id: string;
  email: string;
  role: "HOMEOWNER" | "TRADESPERSON";
  name: string;
  phone: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: "HOMEOWNER" | "TRADESPERSON";
  phone?: string;
}

// ── Map API user (uppercase role) → frontend User (lowercase role) ────
export function mapApiUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    role: apiUser.role.toLowerCase() as User["role"],
    name: apiUser.name,
  };
}

// ── API calls ─────────────────────────────────────────────────

export async function loginApi(
  data: LoginPayload,
): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const res = await api.post<{ user: ApiUser } & AuthTokens>(
    "/auth/login",
    data,
  );
  setTokens(res.data.accessToken, res.data.refreshToken);
  return { ...res.data, user: mapApiUser(res.data.user) };
}

export async function registerApi(
  data: RegisterPayload,
): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const res = await api.post<{ user: ApiUser } & AuthTokens>(
    "/auth/register",
    data,
  );
  setTokens(res.data.accessToken, res.data.refreshToken);
  return { ...res.data, user: mapApiUser(res.data.user) };
}

export async function fetchMe(): Promise<User> {
  const res = await api.get<ApiUser>("/auth/me");
  return mapApiUser(res.data);
}

export async function logoutApi(): Promise<void> {
  clearTokens();
}

export async function checkPhoneApi(
  phone: string,
): Promise<{ exists: boolean }> {
  const res = await api.post<{ exists: boolean }>("/auth/check-phone", {
    phone,
  });
  return res.data;
}

export async function forgotPasswordApi(email: string): Promise<void> {
  await api.post("/auth/forgot-password", { email });
}

export async function resetPasswordApi(
  token: string,
  newPassword: string,
): Promise<void> {
  await api.post("/auth/reset-password", { token, newPassword });
}

export async function verifyEmailApi(token: string): Promise<void> {
  await api.post("/auth/verify-email", { token });
}

// ── Query keys ────────────────────────────────────────────────

export const authKeys = {
  me: ["auth", "me"] as const,
};

// ── Hooks ─────────────────────────────────────────────────────

export function useMe() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: fetchMe,
    enabled: !!getAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      qc.setQueryData(authKeys.me, data.user);
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      qc.setQueryData(authKeys.me, data.user);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      qc.clear();
    },
  });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: forgotPasswordApi });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => resetPasswordApi(token, newPassword),
  });
}

export function useVerifyEmail() {
  return useMutation({ mutationFn: verifyEmailApi });
}
