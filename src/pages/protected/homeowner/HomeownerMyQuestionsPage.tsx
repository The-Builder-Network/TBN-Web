import { useState } from "react";
import { Link } from "react-router-dom";
import { FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AskQuestionModal from "@/components/modals/AskQuestionModal";
import { Helmet } from "react-helmet-async";

const HomeownerMyQuestionsPage = () => {
  const [showAskModal, setShowAskModal] = useState(false);

  return (
    <div className="container py-10">
      <Helmet>
        <title>My Questions — Builder Network</title>
        <meta name="description" content="View and manage the questions you have asked on Builder Network." />
      </Helmet>
      <h1 className="text-3xl font-bold">My questions</h1>

      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <FolderOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No questions posted yet</h2>
        <p className="text-muted-foreground mb-6">
          As soon as your question gets approved, it will appear here.
        </p>
        <Button size="lg" onClick={() => setShowAskModal(true)}>
          Ask a new question
        </Button>
      </div>

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
