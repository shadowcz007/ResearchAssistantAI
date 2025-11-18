
import React, { useState, useCallback } from 'react';
import { Step, ResearchPlan, SmartGoal, ResearchCardData, AiSuggestions } from './types';
import { clarifyIntent, generateSmartGoals, generateDimensions, generateResearchCard } from './services/geminiService';
import StepIndicator from './components/StepIndicator';
import UserInputStep from './components/UserInputStep';
import IntentClarificationStep from './components/IntentClarificationStep';
import SmartGoalStep from './components/SmartGoalStep';
import DimensionSelectionStep from './components/DimensionSelectionStep';
import HypothesisStep from './components/HypothesisStep';
import ResearchCardStep from './components/ResearchCardStep';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

const initialPlan: ResearchPlan = {
  initialProblem: '',
  clarifiedIntent: '',
  smartGoal: {
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  },
  selectedDimensions: [],
  hypothesis: '',
  researchCard: null,
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.InitialInput);
  const [researchPlan, setResearchPlan] = useState<ResearchPlan>(initialPlan);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestions>({
    intents: [],
    smartGoal: null,
    dimensions: [],
  });

  const handleReset = () => {
    setCurrentStep(Step.InitialInput);
    setResearchPlan(initialPlan);
    setAiSuggestions({ intents: [], smartGoal: null, dimensions: [] });
    setError(null);
  };

  const handleNextStep = async (data: Partial<ResearchPlan>) => {
    const updatedPlan = { ...researchPlan, ...data };
    setResearchPlan(updatedPlan);
    setError(null);
    setIsLoading(true);

    try {
      switch (currentStep) {
        case Step.InitialInput:
          const intents = await clarifyIntent(updatedPlan.initialProblem);
          setAiSuggestions(prev => ({ ...prev, intents }));
          setCurrentStep(Step.IntentClarification);
          break;

        case Step.IntentClarification:
          const smartGoal = await generateSmartGoals(updatedPlan.initialProblem, updatedPlan.clarifiedIntent);
          setAiSuggestions(prev => ({ ...prev, smartGoal }));
          setCurrentStep(Step.SmartGoal);
          break;

        case Step.SmartGoal:
          const dimensions = await generateDimensions(updatedPlan.initialProblem, updatedPlan.smartGoal);
          setAiSuggestions(prev => ({ ...prev, dimensions }));
          setCurrentStep(Step.DimensionSelection);
          break;
        
        case Step.DimensionSelection:
          setCurrentStep(Step.Hypothesis);
          break;

        case Step.Hypothesis:
          const researchCard = await generateResearchCard(updatedPlan);
          setResearchPlan(prev => ({ ...prev, researchCard }));
          setCurrentStep(Step.ResearchCard);
          break;
        
        default:
          break;
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while communicating with the AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    if (isLoading) {
      return <Loader />;
    }

    switch (currentStep) {
      case Step.InitialInput:
        return <UserInputStep onNext={problem => handleNextStep({ initialProblem: problem })} />;
      case Step.IntentClarification:
        return <IntentClarificationStep intents={aiSuggestions.intents} onNext={intent => handleNextStep({ clarifiedIntent: intent })} />;
      case Step.SmartGoal:
        return <SmartGoalStep initialGoal={aiSuggestions.smartGoal} onNext={goal => handleNextStep({ smartGoal: goal })} />;
      case Step.DimensionSelection:
        return <DimensionSelectionStep dimensions={aiSuggestions.dimensions} onNext={dims => handleNextStep({ selectedDimensions: dims })} />;
      case Step.Hypothesis:
        return <HypothesisStep onNext={hypothesis => handleNextStep({ hypothesis })} />;
      case Step.ResearchCard:
        return <ResearchCardStep cardData={researchPlan.researchCard} onReset={handleReset} />;
      default:
        return <UserInputStep onNext={problem => handleNextStep({ initialProblem: problem })} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <SparklesIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Research Assistant AI</h1>
            </div>
            <p className="text-slate-600 text-lg">From intuition to a clear research plan, fast.</p>
        </header>
        
        <main className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200">
          {currentStep !== Step.ResearchCard && <StepIndicator currentStep={currentStep} />}
          {error && <div className="my-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg">{error}</div>}
          {renderCurrentStep()}
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
