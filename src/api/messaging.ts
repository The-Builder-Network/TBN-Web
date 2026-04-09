import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type {
  PaginatedResponse,
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

export async function getMessages(
  conversationId: string,
  page = 1,
): Promise<PaginatedResponse<MessageItem>> {
  const res = await api.get<PaginatedResponse<MessageItem>>(
    `/conversations/${conversationId}/messages`,
    {
      params: { page, perPage: 50 },
    },
  );
  return res.data;
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
  return useQuery({
    queryKey: messagingKeys.messages(conversationId),
    queryFn: () => getMessages(conversationId),
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
