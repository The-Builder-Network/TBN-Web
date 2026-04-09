import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type {
  PaginatedResponse,
  QuestionSummary,
  QuestionDetail,
  SortOrder,
} from "./types";

// ── API functions ───────────────────────────────────────────

interface GetQuestionsParams {
  serviceSlug?: string;
  page?: number;
  perPage?: number;
  sort?: "createdAt" | "answerCount";
  order?: SortOrder;
}

export async function getQuestions(
  params: GetQuestionsParams = {},
): Promise<PaginatedResponse<QuestionSummary>> {
  const res = await api.get<PaginatedResponse<QuestionSummary>>("/questions", {
    params,
  });
  return res.data;
}

export async function getQuestion(id: string): Promise<QuestionDetail> {
  const res = await api.get<QuestionDetail>(`/questions/${id}`);
  return res.data;
}

export async function createQuestion(data: {
  title: string;
  body: string;
  serviceSlug?: string;
}): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>("/questions", data);
  return res.data;
}

export async function createAnswer(
  questionId: string,
  body: string,
): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>(
    `/questions/${questionId}/answers`,
    { body },
  );
  return res.data;
}

export async function toggleAnswerLike(
  answerId: string,
): Promise<{ liked: boolean; likesCount: number }> {
  const res = await api.post<{ liked: boolean; likesCount: number }>(
    `/answers/${answerId}/like`,
  );
  return res.data;
}

export async function markBestAnswer(answerId: string): Promise<void> {
  await api.patch(`/answers/${answerId}/best`);
}

// ── Query keys ──────────────────────────────────────────────

export const questionKeys = {
  all: ["questions"] as const,
  list: (params: GetQuestionsParams) =>
    ["questions", "list", params] as const,
  detail: (id: string) => ["questions", "detail", id] as const,
};

// ── Hooks ───────────────────────────────────────────────────

export function useQuestions(params: GetQuestionsParams = {}) {
  return useQuery({
    queryKey: questionKeys.list(params),
    queryFn: () => getQuestions(params),
  });
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: questionKeys.detail(id),
    queryFn: () => getQuestion(id),
    enabled: !!id,
  });
}

export function useCreateQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => qc.invalidateQueries({ queryKey: questionKeys.all }),
  });
}

export function useCreateAnswer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      questionId,
      body,
    }: {
      questionId: string;
      body: string;
    }) => createAnswer(questionId, body),
    onSuccess: (_, { questionId }) => {
      qc.invalidateQueries({ queryKey: questionKeys.detail(questionId) });
      qc.invalidateQueries({ queryKey: questionKeys.all });
    },
  });
}

export function useToggleAnswerLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleAnswerLike,
    onSuccess: () => qc.invalidateQueries({ queryKey: questionKeys.all }),
  });
}

export function useMarkBestAnswer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markBestAnswer,
    onSuccess: () => qc.invalidateQueries({ queryKey: questionKeys.all }),
  });
}

