// ── Question tree types derived from the scraped MyBuilder JSON ──

export type QuestionType =
  | "SelectQuestion"
  | "CheckboxQuestion"
  | "TextareaQuestion"
  | "TitleQuestion"
  | "PostalCodeQuestion"
  | "AttachmentQuestion";

export type OptionType = "StandardChoiceOption" | "TextChoiceOption";

export interface QuestionOption {
  id: string;
  type: OptionType;
  formLabel: string;
  helpText: string | null;
  placeholder?: string;
  /** If the option itself leads to a branching next question */
  next?: QuestionNode;
}

export interface QuestionNode {
  id: string;
  type: QuestionType;
  required?: boolean;
  formLabel: string;
  helpText?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  options?: QuestionOption[];
  /** Fallback next question when no option-level next exists */
  next?: QuestionNode;
}

export interface QuestionTree {
  questionTree: {
    id: string;
    name: string;
    schema: QuestionNode;
    jobFunnel?: {
      id: number;
      name: string;
      type: string;
    };
  };
}

// ── Answer types ──

/** Answer value can be a string, string[] (checkbox), or File[] (attachment) */
export type AnswerValue = string | string[] | File[];

export type Answers = Record<string, AnswerValue>;

// ── History entry for the Back button ──

export interface HistoryEntry {
  node: QuestionNode;
  answer: AnswerValue;
}
