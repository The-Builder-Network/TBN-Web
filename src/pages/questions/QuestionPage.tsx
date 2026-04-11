import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "boneyard-js/react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import {
  useQuestion,
  useCreateAnswer,
  useToggleAnswerLike,
  useMarkBestAnswer,
  useUpdateAnswer,
  useDeleteAnswer,
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
  const updateAnswerMutation = useUpdateAnswer();
  const deleteAnswerMutation = useDeleteAnswer();

  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(
    new Set(),
  );
  const [answerBody, setAnswerBody] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

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
      toast({ title: "Log in to like answers", variant: "destructive" });
      return;
    }
    likeMutation.mutate(answerId, {
      onError: (err: unknown) => {
        const errObj = err as { response?: { data?: { message?: string } } };
        const msg = errObj?.response?.data?.message;
        toast({
          title: msg ?? "Failed to update like",
          variant: "destructive",
        });
      },
    });
  };

  const handleEditStart = (answerId: string, body: string) => {
    setEditingAnswerId(answerId);
    setEditBody(body);
  };

  const handleEditSubmit = (answerId: string) => {
    if (editBody.trim().length < 20) return;
    updateAnswerMutation.mutate(
      { answerId, body: editBody.trim() },
      {
        onSuccess: () => {
          setEditingAnswerId(null);
          setEditBody("");
          toast({ title: "Answer updated!" });
        },
        onError: () =>
          toast({ title: "Failed to update answer", variant: "destructive" }),
      },
    );
  };

  const handleDeleteConfirm = (answerId: string) => {
    deleteAnswerMutation.mutate(
      { answerId },
      {
        onSuccess: () => {
          setDeleteTargetId(null);
          toast({ title: "Answer deleted." });
        },
        onError: () =>
          toast({ title: "Failed to delete answer", variant: "destructive" }),
      },
    );
  };

  const handleMarkBest = (answerId: string) => {
    markBestMutation.mutate(answerId, {
      onSuccess: () => toast({ title: "Best answer marked!" }),
      onError: () =>
        toast({ title: "Failed to mark best answer", variant: "destructive" }),
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

  if (!isLoading && (error || !question)) {
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

  const isAuthor = question ? user?.id === question.authorId : false;

  return (
    <Skeleton name="question-detail" loading={isLoading}>
      <div className="container px-16 py-8">
        <Helmet>
          <title>
            {question
              ? `${question.title} — Builder Network`
              : "Question — Builder Network"}
          </title>
          <meta
            name="description"
            content={
              question
                ? `${question.title} — Read answers from verified tradespeople on Builder Network.`
                : "Read expert home improvement advice from verified tradespeople."
            }
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={
              question
                ? `${question.title} — Builder Network`
                : "Question — Builder Network"
            }
          />
          <meta
            property="og:description"
            content={
              question
                ? `${question.title} — Read answers from verified tradespeople on Builder Network.`
                : "Read expert home improvement advice from verified tradespeople."
            }
          />
        </Helmet>
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:underline inline-flex items-center gap-1"
        >
          &lsaquo; Back
        </button>

        {question && (
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
                  <MessageSquare className="w-4 h-4" />{" "}
                  {question.answers.length} Answer
                  {question.answers.length !== 1 ? "s" : ""}
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
                <form
                  onSubmit={handleSubmitAnswer}
                  className="mb-8 space-y-3 border rounded-lg p-4"
                >
                  <p className="font-medium">Your Answer</p>
                  <Textarea
                    rows={5}
                    value={answerBody}
                    onChange={(e) => setAnswerBody(e.target.value)}
                    placeholder="Share your expertise..."
                  />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                      {answerBody.length < 20
                        ? `${20 - answerBody.length} more character${20 - answerBody.length !== 1 ? "s" : ""} required`
                        : ""}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAnswerForm(false);
                          setAnswerBody("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          answerBody.trim().length < 20 ||
                          createAnswerMutation.isPending
                        }
                      >
                        {createAnswerMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />{" "}
                            Posting…
                          </>
                        ) : (
                          "Post answer"
                        )}
                      </Button>
                    </div>
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
                  const isOwnAnswer = isTradesperson && user?.id === a.authorId;
                  const isEditing = editingAnswerId === a.id;
                  const isDeleting = deleteTargetId === a.id;

                  return (
                    <div key={a.id} className="border-b pb-6 last:border-0">
                      {a.isBest && (
                        <p className="text-sm font-bold text-highlight flex items-center gap-1 mb-2">
                          <Star className="w-3.5 h-3.5 fill-current" /> BEST
                          ANSWER
                        </p>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-medium flex-shrink-0">
                          {a.authorName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary">
                            {a.authorUsername ? (
                              <Link
                                to={`/tradesperson/${a.authorUsername}`}
                                className="hover:underline"
                              >
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
                        {/* Edit / Delete icons for own answers */}
                        {isOwnAnswer && (
                          <div className="flex items-center gap-1 ml-auto">
                            {a.likesCount === 0 && !a.isBest && (
                              <button
                                onClick={() => handleEditStart(a.id, a.body)}
                                title="Edit answer"
                                className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteTargetId(a.id)}
                              title="Delete answer"
                              className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Inline edit form */}
                      {isEditing ? (
                        <div className="mt-3 space-y-2">
                          <Textarea
                            rows={4}
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            placeholder="Edit your answer... (minimum 20 characters)"
                            autoFocus
                          />
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground">
                              {editBody.length < 20
                                ? `${20 - editBody.length} more character${20 - editBody.length !== 1 ? "s" : ""} required`
                                : ""}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingAnswerId(null);
                                  setEditBody("");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                disabled={
                                  editBody.trim().length < 20 ||
                                  updateAnswerMutation.isPending
                                }
                                onClick={() => handleEditSubmit(a.id)}
                              >
                                {updateAnswerMutation.isPending ? (
                                  <>
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />{" "}
                                    Saving…
                                  </>
                                ) : (
                                  "Save"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="mt-3">{displayText}</p>
                          {isLong && (
                            <button
                              onClick={() => toggleExpand(a.id)}
                              className="text-primary font-medium mt-1"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </button>
                          )}
                        </>
                      )}

                      {/* Delete confirmation */}
                      {isDeleting && (
                        <div className="mt-3 flex items-center gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                          <p className="text-sm flex-1">
                            Are you sure you want to delete this answer?
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteTargetId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={deleteAnswerMutation.isPending}
                            onClick={() => handleDeleteConfirm(a.id)}
                          >
                            {deleteAnswerMutation.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <p className="text-sm text-muted-foreground">
                          Answered{" "}
                          {new Date(a.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
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
                            disabled={likeMutation.isPending || isOwnAnswer}
                            title={
                              isOwnAnswer
                                ? "You cannot like your own answer"
                                : ""
                            }
                            className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                              a.likedByMe
                                ? "bg-primary text-primary-foreground border-primary"
                                : isOwnAnswer 
                                  ? "cursor-not-allowed opacity-40"
                                  : "hover:bg-secondary"
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" /> {a.likedByMe ? "Liked" : "Like"}{" "}
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
              {question.answers.length === 0 && !showAnswerForm && (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground">
                    {isTradesperson
                      ? "No answers yet. Be the first to answer!"
                      : "Awaiting a response from a qualified tradesperson."}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {isTradesperson ? (
                <>
                  <div className="border rounded-lg p-5 bg-secondary/30">
                    <p className="font-bold mb-1">Your leads</p>
                    <p className="text-muted-foreground mb-3 text-sm">
                      View and manage all the leads you've received from
                      homeowners.
                    </p>
                    <Link to="/tradesperson/my-leads">
                      <Button className="w-full">View my leads</Button>
                    </Link>
                  </div>
                  <div className="border rounded-lg p-5">
                    <p className="font-bold mb-1">Answer questions</p>
                    <p className="text-sm text-muted-foreground">
                      Share your expertise by answering homeowner questions and
                      grow your reputation.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border rounded-lg p-5">
                    <p className="font-bold mb-1">Ready to hire?</p>
                    <p className="text-muted-foreground mb-3">
                      Post your job in minutes, browse real reviews and choose
                      who to speak to.
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
                </>
              )}
            </div>
          </div>
        )}

        <AskQuestionModal open={showAskModal} onOpenChange={setShowAskModal} />
      </div>
    </Skeleton>
  );
};

export default QuestionDetail;
