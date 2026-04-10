import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "boneyard-js/react";
import { MessageBubble } from "./MessageBubble";
import { useMessages, useSendMessage } from "@/api/messaging";
import { useAuth } from "@/hooks/useAuth";
import { useChatSocket } from "@/hooks/useChatSocket";

interface ChatWindowProps {
  conversationId: string;
  otherPartyName: string;
}

export function ChatWindow({
  conversationId,
  otherPartyName,
}: ChatWindowProps) {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const { peerTyping, emitTyping } = useChatSocket(conversationId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.data]);

  const handleSend = () => {
    const body = input.trim();
    if (!body || sendMessage.isPending) return;
    setInput("");
    sendMessage.mutate({ conversationId, body });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    emitTyping(conversationId);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {}, 1500);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
          {otherPartyName.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-sm">{otherPartyName}</span>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-3">
        <Skeleton name="chat-messages" loading={isLoading}>
          {(data?.data ?? []).length === 0 ? (
            <p className="text-center text-muted-foreground text-sm mt-8">
              No messages yet. Say hello!
            </p>
          ) : (
            (data?.data ?? []).map((msg) => (
              <MessageBubble
                key={msg.id}
                body={msg.body}
                isOwn={msg.senderId === user?.id}
                createdAt={msg.createdAt}
                readAt={msg.readAt}
              />
            ))
          )}
        </Skeleton>

        {/* Typing indicator */}
        {peerTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </ScrollArea>

      {/* Input */}
      <div className="px-4 py-3 border-t flex gap-2 items-end">
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="resize-none min-h-[40px] max-h-[120px] text-sm"
          rows={1}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || sendMessage.isPending}
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
