import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getChatSocket } from "@/lib/socket";
import { messagingKeys } from "@/api/messaging";
import type { MessageItem } from "@/api/types";

/**
 * Hook for real-time chat events on a specific conversation.
 * - Joins the conversation room on mount
 * - Listens for `new_message` → appends to React Query cache
 * - Listens for `typing` → exposes `peerTyping` state
 */
export function useChatSocket(conversationId: string | undefined) {
  const qc = useQueryClient();
  const [peerTyping, setPeerTyping] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const socket = getChatSocket();
    if (!socket.connected) return;

    // Join the conversation room
    socket.emit("join_conversation", { conversationId });

    const onNewMessage = (msg: MessageItem) => {
      // Invalidate the messages query so it refetches with the new message
      void qc.invalidateQueries({
        queryKey: messagingKeys.messages(conversationId),
      });
      // Also refresh conversation list (last message, unread count)
      void qc.invalidateQueries({ queryKey: messagingKeys.conversations });
    };

    const onTyping = (_data: { userId: string }) => {
      setPeerTyping(true);
      // Auto-clear after 2s
      const id = setTimeout(() => setPeerTyping(false), 2000);
      return () => clearTimeout(id);
    };

    socket.on("new_message", onNewMessage);
    socket.on("typing", onTyping);

    return () => {
      socket.off("new_message", onNewMessage);
      socket.off("typing", onTyping);
    };
  }, [conversationId, qc]);

  /** Emit typing indicator to the server */
  const emitTyping = (convId: string) => {
    const socket = getChatSocket();
    if (socket.connected) {
      socket.emit("typing", { conversationId: convId });
    }
  };

  return { peerTyping, emitTyping };
}
