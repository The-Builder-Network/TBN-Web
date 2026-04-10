import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import JobServiceSelector from "@/components/post-job/JobServiceSelector";
import JobFunnel from "@/components/post-job/JobFunnel";
import { loadQuestionTree } from "@/helpers/QuestionTreeHelper";
import { services } from "@/constants/services";
import type { QuestionNode } from "@/types/post-job";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const PostJob = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [rootNode, setRootNode] = useState<QuestionNode | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [initialPostcode, setInitialPostcode] = useState("");
  const navigate = useNavigate();
  const { isTradesperson } = useAuth();

  // Block tradesperson from accessing this page
  useEffect(() => {
    if (isTradesperson) {
      toast({
        title: "Tradesperson account",
        description:
          "Tradesperson accounts cannot post jobs. Please sign in as a homeowner.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [isTradesperson, navigate]);

  // Don't render the page content for tradespersons — prevents flash before redirect
  if (isTradesperson) return null;

  // Handle URL ?service=slug and ?postcode= params on mount
  useEffect(() => {
    const slugParam = searchParams.get("service");
    const postcodeParam = searchParams.get("postcode");

    if (postcodeParam) {
      setInitialPostcode(postcodeParam.toUpperCase());
    }

    if (slugParam) {
      const tree = loadQuestionTree(slugParam);
      if (tree) {
        const name =
          services.find((s) => s.slug === slugParam)?.name ??
          tree.questionTree.name;
        setSelectedSlug(slugParam);
        setRootNode(tree.questionTree.schema);
        setServiceName(name);
      } else {
        // Invalid slug — strip from URL
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete("service");
          return next;
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectService = useCallback(
    (slug: string) => {
      const tree = loadQuestionTree(slug);
      if (!tree) return;

      setSelectedSlug(slug);
      setRootNode(tree.questionTree.schema);
      setServiceName(
        services.find((s) => s.slug === slug)?.name ?? tree.questionTree.name,
      );

      // Persist slug in URL (keep postcode if present)
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("service", slug);
        return next;
      });
    },
    [setSearchParams],
  );

  const handleBackToServices = useCallback(() => {
    setSelectedSlug(null);
    setRootNode(null);
    setServiceName("");
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <main className="flex-1 container py-10">
      <Helmet>
        <title>Post a Job | The Builder Network</title>
        <meta
          name="description"
          content="Describe your job and get matched with verified tradespeople near you. Free to post."
        />
      </Helmet>
      <div className="w-full max-w-2xl mx-auto px-4">
        {rootNode && selectedSlug ? (
          <JobFunnel
            key={selectedSlug}
            rootNode={rootNode}
            serviceName={serviceName}
            serviceSlug={selectedSlug}
            initialPostcode={initialPostcode}
            onBackToServices={handleBackToServices}
          />
        ) : (
          <JobServiceSelector onSelect={selectService} />
        )}
      </div>
    </main>
  );
};

export default PostJob;
