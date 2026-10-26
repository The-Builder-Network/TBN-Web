import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "./client";
import type {
  ConversationSummary,
  MessageItem,
} from "./types";

export async function getConversations(): Promise<{
  conversations: ConversationSummary[];
}> {
  const res = await api.get<{ conversations: ConversationSummary[] }>(
    "/conversations",
  );
  return res.data;
}

export interface MessagesPage {
  data: MessageItem[];
  hasMore: boolean;
  nextBefore: string | null;
}

/** Newest page first; pass `before` (a message id/cursor) to load older messages. */
export async function getMessages(
  conversationId: string,
  before?: string,
): Promise<MessagesPage> {
  const res = await api.get<MessagesPage>(
    `/conversations/${conversationId}/messages`,
    { params: { before, limit: 50 } },
  );
  return res.data;
}

export async function markConversationRead(conversationId: string) {
  await api.post(`/conversations/${conversationId}/read`);
}

export async function sendMessage(
  conversationId: string,
  body: string,
): Promise<MessageItem> {
  const res = await api.post<MessageItem>(
    `/conversations/${conversationId}/messages`,
    { body },
  );
  return res.data;
}

export const messagingKeys = {
  conversations: ["conversations"] as const,
  messages: (conversationId: string) => ["messages", conversationId] as const,
};

export function useConversations() {
  return useQuery({
    queryKey: messagingKeys.conversations,
    queryFn: getConversations,
  });
}

export function useMessages(conversationId: string) {
  return useInfiniteQuery({
    queryKey: messagingKeys.messages(conversationId),
    queryFn: ({ pageParam }) => getMessages(conversationId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => (last.hasMore ? (last.nextBefore ?? undefined) : undefined),
    // Oldest page first so messages read top-to-bottom.
    select: (d) => d.pages.slice().reverse().flatMap((p) => p.data),
    enabled: !!conversationId,
    refetchInterval: 60_000, // fallback poll — real-time handled by Socket.IO
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      conversationId,
      body,
    }: {
      conversationId: string;
      body: string;
    }) => sendMessage(conversationId, body),
    onSuccess: (_, { conversationId }) => {
      void qc.invalidateQueries({
        queryKey: messagingKeys.messages(conversationId),
      });
      void qc.invalidateQueries({ queryKey: messagingKeys.conversations });
    },
  });
}
