import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Star, ThumbsUp, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import {
  useQuestion,
  useCreateAnswer,
  useToggleAnswerLike,
  useMarkBestAnswer,
} from "@/api/questions";
import { useAuth } from "@/hooks/useAuth";

const TRUNCATE_LENGTH = 180;

const QuestionDetail = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { user, isTradesperson } = useAuth();

  const { data: question, isLoading, error } = useQuestion(questionId!);
  const createAnswerMutation = useCreateAnswer();
  const likeMutation = useToggleAnswerLike();
  const markBestMutation = useMarkBestAnswer();

  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(
    new Set(),
  );
  const [answerBody, setAnswerBody] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLike = (answerId: string) => {
    if (!user) {
      toast({ title: "Sign in to like answers", variant: "destructive" });
      return;
    }
    likeMutation.mutate(answerId, {
      onError: () => toast({ title: "Failed to update like", variant: "destructive" }),
    });
  };

  const handleMarkBest = (answerId: string) => {
    markBestMutation.mutate(answerId, {
      onSuccess: () => toast({ title: "Best answer marked!" }),
      onError: () => toast({ title: "Failed to mark best answer", variant: "destructive" }),
    });
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerBody.trim()) return;
    createAnswerMutation.mutate(
      { questionId: questionId!, body: answerBody },
      {
        onSuccess: () => {
          setAnswerBody("");
          setShowAnswerForm(false);
          toast({ title: "Answer posted!" });
        },
        onError: () =>
          toast({ title: "Failed to post answer", variant: "destructive" }),
      },
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Skeleton className="h-4 w-24 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-24 w-full" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border-b pb-6 space-y-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error / not found state
  if (error || !question) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground mb-4">
          {error ? "Failed to load question." : "Question not found."}
        </p>
        <Button variant="outline" onClick={() => navigate("/questions")}>
          Back to questions
        </Button>
      </div>
    );
  }

  const isAuthor = user?.id === question.authorId;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/questions"
        className="text-primary hover:underline inline-flex items-center gap-1"
      >
        &lsaquo; Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="md:col-span-2">
          {question.serviceSlug && (
            <p className="text-sm text-primary font-medium mb-1 capitalize">
              {question.serviceSlug.replace(/-/g, " ")}
            </p>
          )}
          <h1 className="text-2xl font-bold mb-1">{question.title}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {question.authorName}
          </p>
          <p className="text-muted-foreground mb-6">{question.body}</p>

          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> {question.answers.length}{" "}
              Answer{question.answers.length !== 1 ? "s" : ""}
            </p>
            {isTradesperson && !showAnswerForm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnswerForm(true)}
              >
                Post an answer
              </Button>
            )}
          </div>

          {/* Answer form (tradesperson only) */}
          {showAnswerForm && (
            <form onSubmit={handleSubmitAnswer} className="mb-8 space-y-3 border rounded-lg p-4">
              <p className="font-medium">Your Answer</p>
              <Textarea
                rows={5}
                value={answerBody}
                onChange={(e) => setAnswerBody(e.target.value)}
                placeholder="Share your expertise..."
              />
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setShowAnswerForm(false); setAnswerBody(""); }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!answerBody.trim() || createAnswerMutation.isPending}
                >
                  {createAnswerMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Posting…</>
                  ) : (
                    "Post answer"
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Answers */}
          <div className="space-y-6">
            {question.answers.map((a) => {
              const isLong = a.body.length > TRUNCATE_LENGTH;
              const isExpanded = expandedAnswers.has(a.id);
              const displayText =
                isLong && !isExpanded
                  ? a.body.slice(0, TRUNCATE_LENGTH) + "..."
                  : a.body;

              return (
                <div key={a.id} className="border-b pb-6 last:border-0">
                  {a.isBest && (
                    <p className="text-sm font-bold text-highlight flex items-center gap-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-current" /> BEST ANSWER
                    </p>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-medium flex-shrink-0">
                      {a.authorName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-primary">
                        {a.authorUsername ? (
                          <Link to={`/tradespeople/${a.authorUsername}`} className="hover:underline">
                            {a.authorName}
                          </Link>
                        ) : (
                          a.authorName
                        )}
                      </p>
                      {a.authorTrade && (
                        <p className="text-sm text-muted-foreground capitalize">
                          {a.authorTrade.replace(/-/g, " ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-3">{displayText}</p>
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(a.id)}
                      className="text-primary font-medium mt-1"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <p className="text-sm text-muted-foreground">
                      Answered {new Date(a.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <div className="flex items-center gap-2">
                      {isAuthor && !a.isBest && (
                        <button
                          onClick={() => handleMarkBest(a.id)}
                          disabled={markBestMutation.isPending}
                          className="text-sm border rounded-lg px-3 py-1.5 font-medium hover:bg-secondary transition-colors disabled:opacity-50"
                        >
                          Mark as best
                        </button>
                      )}
                      <button
                        onClick={() => handleLike(a.id)}
                        disabled={likeMutation.isPending}
                        className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                          a.likedByMe
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-secondary"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> Like{" "}
                        <span
                          className={`px-1.5 py-0.5 rounded text-sm ${a.likedByMe ? "bg-primary-foreground/20" : "bg-secondary"}`}
                        >
                          {a.likesCount}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty answers state */}
          {question.answers.length === 0 && (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">
                No answers yet. Be the first to answer!
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="border rounded-lg p-5">
            <p className="font-bold mb-1">Ready to hire?</p>
            <p className="text-muted-foreground mb-3">
              Post your job in minutes, browse real reviews and choose who to
              speak to.
            </p>
            <Link to="/post-job">
              <Button className="w-full">Post a job</Button>
            </Link>
          </div>
          <div className="border rounded-lg p-5">
            <p className="font-bold mb-1">Need some tips or advice?</p>
            <button
              onClick={() => setShowAskModal(true)}
              className="w-full border rounded-lg px-4 py-2 font-medium hover:bg-secondary transition-colors mt-2"
            >
              Ask a question
            </button>
          </div>
        </div>
      </div>

      <AskQuestionModal open={showAskModal} onOpenChange={setShowAskModal} />
    </div>
  );
};

export default QuestionDetail;
