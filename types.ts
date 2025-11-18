
export enum Step {
  InitialInput,
  IntentClarification,
  SmartGoal,
  DimensionSelection,
  Hypothesis,
  ResearchCard,
}

export interface SmartGoal {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface ResearchCardData {
  goal: string;
  questions: string[];
  scope: string;
  hypothesis: string;
}

export interface ResearchPlan {
  initialProblem: string;
  clarifiedIntent: string;
  smartGoal: SmartGoal;
  selectedDimensions: string[];
  hypothesis: string;
  researchCard: ResearchCardData | null;
}

export interface AiSuggestions {
  intents: string[];
  smartGoal: SmartGoal | null;
  dimensions: string[];
}
