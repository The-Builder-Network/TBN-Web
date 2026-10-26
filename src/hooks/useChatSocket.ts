import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getChatSocket } from "@/lib/socket";
import { messagingKeys } from "@/api/messaging";

/**
 * Real-time events for one conversation: joins its room (and re-joins after a
 * reconnect), refreshes messages on `new_message` / `messages_read`, and
 * exposes the other party's typing state.
 */
export function useChatSocket(conversationId: string | undefined) {
  const qc = useQueryClient();
  const [peerTyping, setPeerTyping] = useState(false);

  useEffect(() => {
    if (!conversationId) return;
    const socket = getChatSocket();
    let typingTimer: ReturnType<typeof setTimeout> | undefined;

    const join = () => socket.emit("join_conversation", { conversationId });
    const refresh = (e: { conversationId?: string }) => {
      if (e?.conversationId && e.conversationId !== conversationId) return;
      void qc.invalidateQueries({ queryKey: messagingKeys.messages(conversationId) });
      void qc.invalidateQueries({ queryKey: messagingKeys.conversations });
    };
    const onNewMessage = (e: { conversationId?: string }) => {
      setPeerTyping(false);
      refresh(e);
    };
    const onTyping = (e: { conversationId?: string }) => {
      if (e?.conversationId && e.conversationId !== conversationId) return;
      setPeerTyping(true);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => setPeerTyping(false), 2000);
    };

    socket.on("connect", join);
    socket.on("new_message", onNewMessage);
    socket.on("messages_read", refresh);
    socket.on("typing", onTyping);
    if (socket.connected) join();

    return () => {
      clearTimeout(typingTimer);
      if (socket.connected) socket.emit("leave_conversation", { conversationId });
      socket.off("connect", join);
      socket.off("new_message", onNewMessage);
      socket.off("messages_read", refresh);
      socket.off("typing", onTyping);
    };
  }, [conversationId, qc]);

  /** Emit typing indicator to the server */
  const emitTyping = (convId: string) => {
    const socket = getChatSocket();
    if (socket.connected) socket.emit("typing", { conversationId: convId });
  };

  return { peerTyping, emitTyping };
}
