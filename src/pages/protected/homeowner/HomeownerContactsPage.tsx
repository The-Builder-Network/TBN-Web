import { useState } from "react";
import { MessageCircle, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "boneyard-js/react";
import { useNavigate } from "react-router-dom";
import { ConversationListItem } from "@/components/messaging/ConversationListItem";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { useConversations } from "@/api/messaging";
import { Helmet } from "react-helmet-async";

const HomeownerContactsPage = () => {
  const navigate = useNavigate();
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const { data, isLoading, isError } = useConversations();
  const conversations = data?.conversations ?? [];

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );
  const otherPartyName = selectedConversation?.otherParty.name ?? "";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contacts | The Builder Network</title>
        <meta
          name="description"
          content="Message tradespeople and manage your contacts on The Builder Network."
        />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <div className="border rounded-lg overflow-hidden flex h-[calc(100vh-200px)] min-h-[500px]">
          {/* Left panel — conversation list */}
          <div className="w-full md:w-80 shrink-0 border-r flex flex-col overflow-hidden">
            <Skeleton name="conversations-list" loading={isLoading}>
              {isError ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  Could not load conversations.
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center flex-1">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <FolderOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium mb-1">No messages yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conversations appear here when tradespeople express interest
                    in your jobs.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/homeowner/my-jobs")}
                  >
                    View my jobs
                  </Button>
                </div>
              ) : (
                <div className="overflow-y-auto flex-1">
                  {conversations.map((conv) => (
                    <ConversationListItem
                      key={conv.id}
                      conversation={conv}
                      isActive={conv.id === selectedConversationId}
                      onClick={() => setSelectedConversationId(conv.id)}
                    />
                  ))}
                </div>
              )}
            </Skeleton>
          </div>

          {/* Right panel — chat window */}
          <div className="hidden md:flex flex-1 flex-col">
            {selectedConversationId ? (
              <ChatWindow
                conversationId={selectedConversationId}
                otherPartyName={otherPartyName}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mb-4 opacity-30" />
                <p className="font-medium">Select a conversation</p>
                <p className="text-sm mt-1">Choose from the list on the left</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: show chat window full-screen when a conversation is selected */}
        {selectedConversationId && (
          <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedConversationId(null)}
              >
                ← Back
              </Button>
              <span className="font-semibold">{otherPartyName}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatWindow
                conversationId={selectedConversationId}
                otherPartyName={otherPartyName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeownerContactsPage;
