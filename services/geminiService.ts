
import { GoogleGenAI, Type } from "@google/genai";
import { ResearchPlan, SmartGoal, ResearchCardData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

async function callGeminiWithRetries<T,>(prompt: string, responseSchema: any, retries = 3): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    temperature: 0.5,
                },
            });
            const jsonText = response.text.trim();
            return JSON.parse(jsonText) as T;
        } catch (error) {
            console.error(`Gemini API call failed on attempt ${i + 1}`, error);
            if (i === retries - 1) {
                throw new Error("Failed to get a valid response from AI after multiple attempts.");
            }
        }
    }
    throw new Error("Gemini API call failed unexpectedly.");
}

export const clarifyIntent = async (problem: string): Promise<string[]> => {
  const prompt = `Given the user's problem: "${problem}", generate 2-3 clarifying questions to understand their specific intent. For example, 'Are you trying to solve an existing problem or explore a new opportunity?'. Frame them as complete questions a user can choose from.`;
  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.STRING
    }
  };
  return callGeminiWithRetries<string[]>(prompt, schema);
};

export const generateSmartGoals = async (problem: string, intent: string): Promise<SmartGoal> => {
  const prompt = `Based on the research problem "${problem}" and the user's clarified intent "${intent}", suggest components for a S.M.A.R.T. goal. Provide a concise, business-oriented suggestion for each of the following aspects: Specific, Measurable, Achievable, Relevant, and Time-bound.`;
  const schema = {
    type: Type.OBJECT,
    properties: {
      specific: { type: Type.STRING, description: "A specific, clear objective." },
      measurable: { type: Type.STRING, description: "A key metric to track progress." },
      achievable: { type: Type.STRING, description: "A realistic goal given resources." },
      relevant: { type: Type.STRING, description: "How the goal aligns with broader business objectives." },
      timeBound: { type: Type.STRING, description: "A specific timeframe for completion." },
    },
    required: ["specific", "measurable", "achievable", "relevant", "timeBound"]
  };
  return callGeminiWithRetries<SmartGoal>(prompt, schema);
};

export const generateDimensions = async (problem: string, smartGoal: SmartGoal): Promise<string[]> => {
  const prompt = `For a research project about "${problem}" with the S.M.A.R.T. goal: "${JSON.stringify(smartGoal)}", what are the key analytical dimensions to investigate? List up to 8 relevant dimensions. Examples could be 'Customer Segments', 'Product Usage Patterns', 'Market Trends', 'Competitor Analysis', etc.`;
  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.STRING
    }
  };
  return callGeminiWithRetries<string[]>(prompt, schema);
};

export const generateResearchCard = async (plan: ResearchPlan): Promise<ResearchCardData> => {
  const prompt = `You are an expert research analyst. A user has provided the following information for a research plan:
  - Initial Problem: "${plan.initialProblem}"
  - Clarified Intent: "${plan.clarifiedIntent}"
  - S.M.A.R.T. Goal: "${JSON.stringify(plan.smartGoal)}"
  - Key Dimensions for Analysis: "${plan.selectedDimensions.join(', ')}"
  - Core Hypothesis: "${plan.hypothesis}"

  Synthesize this information into a concise 'Research Requirement Card'. Use ONLY plain business language and avoid all technical jargon. The output must be a well-structured JSON object.
  - 'goal': A one-sentence summary of the research objective.
  - 'questions': An array of 3-5 key research questions to be answered.
  - 'scope': A short paragraph defining what is in and out of scope for this research.
  - 'hypothesis': Rephrase the user's core hypothesis into a clear, testable business statement.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      goal: { type: Type.STRING },
      questions: { type: Type.ARRAY, items: { type: Type.STRING } },
      scope: { type: Type.STRING },
      hypothesis: { type: Type.STRING }
    },
    required: ["goal", "questions", "scope", "hypothesis"]
  };
  return callGeminiWithRetries<ResearchCardData>(prompt, schema);
};
