import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  OTHER_SEP,
  type QuestionNode,
  type AnswerValue,
  type Answers,
  type HistoryEntry,
} from "@/types/post-job";
import type { CreateJobData } from "@/api/jobs";
import { extractError } from "@/api/client";
import QuestionRenderer from "./QuestionRenderer";
import FunnelEmailStep from "./FunnelEmailStep";
import FunnelAccountStep from "./FunnelAccountStep";
import { useAuth } from "@/hooks/useAuth";
import { useCreateJob } from "@/api/jobs";
import { useToast } from "@/hooks/use-toast";

// Internal steps injected after the question tree finishes
type AuthStep = "questions" | "email" | "account" | "submitting";

interface JobFunnelProps {
  /** Root schema node of the loaded question tree */
  rootNode: QuestionNode;
  /** Display name for the service (used in heading) */
  serviceName: string;
  /** Service slug — passed to the create-job API */
  serviceSlug: string;
  /** Called when the user clicks Back on the very first question */
  onBackToServices: () => void;
  /** Pre-filled postcode from URL query param */
  initialPostcode?: string;
  /** Tradesperson username to invite ("Request a quote" from a profile) */
  inviteUsername?: string;
}

/**
 * Manages the question-tree traversal, history stack, answers state,
 * and progress bar for a single service funnel.
 *
 * For unauthenticated users, injects email + account-creation steps
 * after the question tree completes (the MyBuilder homeowner flow).
 */
const JobFunnel = ({
  rootNode,
  serviceName,
  serviceSlug,
  onBackToServices,
  initialPostcode = "",
  inviteUsername,
}: JobFunnelProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createJobMutation = useCreateJob();

  const [currentNode, setCurrentNode] = useState<QuestionNode>(rootNode);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [authStep, setAuthStep] = useState<AuthStep>("questions");
  const [capturedEmail, setCapturedEmail] = useState("");
  const [finalAnswers, setFinalAnswers] = useState<Answers>({});

  // Reset when the root changes (service change)
  useEffect(() => {
    setCurrentNode(rootNode);
    setHistory([]);
    setAnswers({});
    setAuthStep("questions");
  }, [rootNode]);

  // Scroll to top on node change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentNode.id, authStep]);

  // ── Progress calculation ──
  const totalSteps = useMemo(() => {
    const maxDepth = countMaxDepth(rootNode);
    // Add 2 extra steps for email + account if user is not authenticated
    return 1 + maxDepth + (isAuthenticated ? 0 : 2);
  }, [rootNode, isAuthenticated]);

  const currentStep =
    2 +
    history.length +
    (authStep === "email" ? 1 : authStep === "account" ? 2 : 0);
  const progress = Math.min(
    ((currentStep - 1) / Math.max(totalSteps - 1, 1)) * 100,
    authStep === "questions" ? 90 : 95,
  );

  // ── Resolve the next node given an answer ──
  const resolveNext = useCallback(
    (node: QuestionNode, answer: AnswerValue): QuestionNode | null => {
      if (
        node.type === "SelectQuestion" &&
        node.options &&
        typeof answer === "string"
      ) {
        const id = answer.split(OTHER_SEP)[0];
        const selectedOption = node.options.find((o) => o.id === id);
        if (selectedOption?.next) return selectedOption.next;
      }
      if (node.next) return node.next;
      return null;
    },
    [],
  );

  // ── Submit job to API ──
  const submitJob = useCallback(
    (collectedAnswers: Answers) => {
      const job = buildJob(rootNode, collectedAnswers, resolveNext, serviceName);
      createJobMutation.mutate(
        { ...job, serviceSlug, inviteUsername },
        {
          onSuccess: (created) => {
            navigate(`/homeowner/my-jobs/${created.jobNumber}`);
          },
          onError: (err: unknown) => {
            toast({
              title: "Job post failed",
              description: extractError(err) || "Could not post job. Please try again.",
              variant: "destructive",
            });
            setAuthStep("questions");
          },
        },
      );
    },
    [rootNode, resolveNext, serviceSlug, serviceName, inviteUsername, createJobMutation, navigate, toast],
  );

  // ── Question tree advance ──
  const handleNext = useCallback(
    (answer: AnswerValue) => {
      const updated = { ...answers, [currentNode.id]: answer };
      setAnswers(updated);

      const nextNode = resolveNext(currentNode, answer);
      if (nextNode) {
        setHistory((prev) => [...prev, { node: currentNode, answer }]);
        setCurrentNode(nextNode);
      } else {
        // End of question tree
        setFinalAnswers(updated);
        if (isAuthenticated) {
          // Logged-in user → submit immediately
          setAuthStep("submitting");
          submitJob(updated);
        } else {
          // Unauthenticated → collect email
          setAuthStep("email");
        }
      }
    },
    [currentNode, answers, resolveNext, isAuthenticated, submitJob],
  );

  const handleBack = useCallback(() => {
    if (history.length === 0) {
      onBackToServices();
      return;
    }
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentNode(prev.node);
  }, [history, onBackToServices]);

  // ── Email step handlers ──
  const handleEmailNext = (email: string, existingUser: boolean) => {
    setCapturedEmail(email);
    if (existingUser) {
      // Existing user: login handled inside FunnelEmailStep — this won't be called for existing users
      setAuthStep("account");
    } else {
      setAuthStep("account");
    }
  };

  const handleLoginSuccess = (_email: string) => {
    // Existing user logged in inside FunnelEmailStep — submit job
    setAuthStep("submitting");
    submitJob(finalAnswers);
  };

  const handleAccountSuccess = () => {
    setAuthStep("submitting");
    submitJob(finalAnswers);
  };

  // ── Determine heading — always the job title ──
  const heading = `Post a ${serviceName} job`;

  // ── Submitting overlay ──
  if (authStep === "submitting") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg font-medium">Posting your job...</p>
        <p className="text-sm text-muted-foreground">
          We're finding the best tradespeople near you.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        <div className="space-y-3">
          <div className="flex items-center justify-end text-sm">
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {authStep === "email" && (
        <FunnelEmailStep
          serviceName={serviceName}
          onNext={handleEmailNext}
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setAuthStep("questions")}
        />
      )}

      {authStep === "account" && (
        <FunnelAccountStep
          email={capturedEmail}
          onSuccess={handleAccountSuccess}
          onBack={() => setAuthStep("email")}
        />
      )}

      {authStep === "questions" && (
        <QuestionRenderer
          key={currentNode.id}
          node={currentNode}
          initialAnswer={
            answers[currentNode.id] ??
            (currentNode.type === "PostalCodeQuestion" && initialPostcode
              ? initialPostcode
              : undefined)
          }
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default JobFunnel;

// ─── Helpers ─────────────────────────────────────────────────────

function countMaxDepth(
  node: QuestionNode | undefined,
  seen = new Set<string>(),
): number {
  if (!node || seen.has(node.id)) return 0;
  seen.add(node.id);

  let maxChild = 0;

  if (node.options) {
    for (const opt of node.options) {
      if (opt.next) {
        maxChild = Math.max(maxChild, countMaxDepth(opt.next, new Set(seen)));
      }
    }
  }

  if (node.next) {
    maxChild = Math.max(maxChild, countMaxDepth(node.next, new Set(seen)));
  }

  return 1 + maxChild;
}

/** Human-readable label(s) for a select/checkbox answer, including any "Other" text. */
function optionLabels(node: QuestionNode, answer: AnswerValue): string {
  const values = Array.isArray(answer) ? (answer as string[]) : [answer as string];
  return values
    .map((v) => {
      const [id, other] = v.split(OTHER_SEP);
      const label = node.options?.find((o) => o.id === id)?.formLabel ?? id;
      return other?.trim() ? `${label}: ${other.trim()}` : label;
    })
    .join(", ");
}

/**
 * Walk the path the homeowner actually took (answers to abandoned branches are
 * ignored) and turn it into the create-job payload.
 */
function buildJob(
  root: QuestionNode,
  answers: Answers,
  next: (node: QuestionNode, answer: AnswerValue) => QuestionNode | null,
  serviceName: string,
): Omit<CreateJobData, "serviceSlug"> {
  let title = "";
  let postcode = "";
  const descriptions: string[] = [];
  const attachments: File[] = [];
  const qa: { question: string; answer: string }[] = [];

  const seen = new Set<string>();
  let node: QuestionNode | null = root;
  while (node && !seen.has(node.id)) {
    seen.add(node.id);
    const answer = answers[node.id];
    if (answer === undefined) break;
    switch (node.type) {
      case "TitleQuestion":
        title = String(answer).trim();
        break;
      case "TextareaQuestion":
        if (String(answer).trim()) descriptions.push(String(answer).trim());
        break;
      case "PostalCodeQuestion":
        postcode = String(answer).trim().toUpperCase();
        break;
      case "AttachmentQuestion":
        attachments.push(...(answer as File[]));
        break;
      case "IntegerQuestion":
        if (String(answer)) qa.push({ question: node.formLabel, answer: String(answer) });
        break;
      default: {
        const label = optionLabels(node, answer);
        if (label) qa.push({ question: node.formLabel, answer: label });
      }
    }
    node = next(node, answer);
  }

  title = (title || `${serviceName} job`).slice(0, 100);
  return {
    title,
    description: (descriptions.join("\n\n") || title).slice(0, 5000),
    postcode,
    answers: qa,
    attachments: attachments.slice(0, 10),
  };
}
