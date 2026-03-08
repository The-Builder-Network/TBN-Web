import { useState, useEffect, useCallback, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import type { QuestionNode, AnswerValue, Answers, HistoryEntry } from "@/types/post-job";
import QuestionRenderer from "./QuestionRenderer";

interface JobFunnelProps {
  /** Root schema node of the loaded question tree */
  rootNode: QuestionNode;
  /** Display name for the service (used in heading) */
  serviceName: string;
  /** Called when the user clicks Back on the very first question */
  onBackToServices: () => void;
  /** Pre-filled postcode from URL query param */
  initialPostcode?: string;
}

/**
 * Manages the question-tree traversal, history stack, answers state,
 * and progress bar for a single service funnel.
 */
const JobFunnel = ({
  rootNode,
  serviceName,
  onBackToServices,
  initialPostcode = "",
}: JobFunnelProps) => {
  const [currentNode, setCurrentNode] = useState<QuestionNode>(rootNode);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [answers, setAnswers] = useState<Answers>({});

  // Reset when the root changes (service change)
  useEffect(() => {
    setCurrentNode(rootNode);
    setHistory([]);
    setAnswers({});
  }, [rootNode]);

  // Scroll to top on node change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentNode.id]);

  // ── Progress calculation ──
  // Total steps = service selection (1) + max question depth
  const totalSteps = useMemo(() => {
    const maxDepth = countMaxDepth(rootNode);
    return 1 + maxDepth; // 1 for service + questions
  }, [rootNode]);

  // Current step = service (1) + answered questions + current question (1)
  const currentStep = 2 + history.length;

  // Calculate progress (0-100%), capped at 95% until completion
  const progress = Math.min(
    ((currentStep - 1) / Math.max(totalSteps - 1, 1)) * 100,
    95,
  );

  // ── Resolve the next node given an answer ──
  const resolveNext = useCallback(
    (node: QuestionNode, answer: AnswerValue): QuestionNode | null => {
      // For select questions, the chosen option may have its own `next`
      if (
        node.type === "SelectQuestion" &&
        node.options &&
        typeof answer === "string"
      ) {
        const selectedOption = node.options.find((o) => o.id === answer);
        if (selectedOption?.next) return selectedOption.next;
      }

      // Fallback: node-level `next`
      if (node.next) return node.next;

      return null; // end of tree
    },
    [],
  );

  // ── Handlers ──

  const handleNext = useCallback(
    (answer: AnswerValue) => {
      // Save answer
      setAnswers((prev) => ({ ...prev, [currentNode.id]: answer }));

      const nextNode = resolveNext(currentNode, answer);
      if (nextNode) {
        setHistory((prev) => [...prev, { node: currentNode, answer }]);
        setCurrentNode(nextNode);
      } else {
        // End of funnel — log all answers
        const finalAnswers = { ...answers, [currentNode.id]: answer };
        console.log("Job funnel complete!", finalAnswers);
      }
    },
    [currentNode, answers, resolveNext],
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

  // ── Determine heading ──
  const isPostalCode = currentNode.type === "PostalCodeQuestion";
  const heading = isPostalCode
    ? "Get responses from tradespeople near you"
    : `Post a ${serviceName} job`;

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        <div className="space-y-3">
          <div className="flex items-center justify-end text-sm">
            <span className="font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

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
    </div>
  );
};

export default JobFunnel;

// ─── Helpers ─────────────────────────────────────────────────────

/**
 * Walk the tree and return the maximum depth (longest path).
 * Used to size the progress bar. Memoised at the component level.
 */
function countMaxDepth(
  node: QuestionNode | undefined,
  seen = new Set<string>(),
): number {
  if (!node || seen.has(node.id)) return 0;
  seen.add(node.id);

  let maxChild = 0;

  // Depths from option-level nexts
  if (node.options) {
    for (const opt of node.options) {
      if (opt.next) {
        maxChild = Math.max(maxChild, countMaxDepth(opt.next, new Set(seen)));
      }
    }
  }

  // Depth from node-level next
  if (node.next) {
    maxChild = Math.max(maxChild, countMaxDepth(node.next, new Set(seen)));
  }

  return 1 + maxChild;
}
