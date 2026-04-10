import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderOpen,
  ArrowRight,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import { Helmet } from "react-helmet-async";
import { useQuestions } from "@/api/questions";
import { SkeletonCard } from "@/components/shared/SkeletonCard";

const HomeownerMyQuestionsPage = () => {
  const [showAskModal, setShowAskModal] = useState(false);

  const { data, isLoading, error, refetch } = useQuestions({
    authorId: "mine",
  });
  const questions = data?.data ?? [];

  return (
    <div className="container py-10">
      <Helmet>
        <title>My Questions | The Builder Network</title>
        <meta
          name="description"
          content="View and manage the questions you have asked on Builder Network."
        />
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My questions</h1>
        <Button onClick={() => setShowAskModal(true)}>Ask a question</Button>
      </div>

      {/* Loading */} 
      {isLoading && (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="w-10 h-10 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            Could not load your questions.
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && questions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <FolderOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No questions posted yet</h2>
          <p className="text-muted-foreground mb-6">
            Ask tradespeople for advice — your questions will appear here.
          </p>
          <Button size="lg" onClick={() => setShowAskModal(true)}>
            Ask a new question
          </Button>
        </div>
      )}

      {/* Questions list */}
      {!isLoading && !error && questions.length > 0 && (
        <div className="space-y-4">
          {questions.map((q) => (
            <Link
              key={q.id}
              to={`/questions/${q.id}`}
              className="block border rounded-lg p-5 hover:shadow-sm transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-1">{q.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                {q.body}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {q.answerCount} {q.answerCount === 1 ? "answer" : "answers"}
                </span>
                {q.hasBestAnswer && (
                  <span className="text-green-600 font-medium">
                    Best answer chosen
                  </span>
                )}
                <span>{new Date(q.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="border-t mt-12 pt-6 flex items-center justify-between">
        <p className="font-bold text-lg">Get inspired by other questions</p>
        <Link
          to="/questions"
          className="text-foreground hover:underline flex items-center gap-1.5"
        >
          <ArrowRight className="w-4 h-4" />
          Read other user QnA
        </Link>
      </div>

      <AskQuestionModal open={showAskModal} onOpenChange={setShowAskModal} />
    </div>
  );
};

export default HomeownerMyQuestionsPage;
