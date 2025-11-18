
import React from 'react';
import { ResearchCardData } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface ResearchCardStepProps {
  cardData: ResearchCardData | null;
  onReset: () => void;
}

const ResearchCardStep: React.FC<ResearchCardStepProps> = ({ cardData, onReset }) => {
  if (!cardData) {
    return <div>Loading research card...</div>;
  }

  return (
    <div className="animate-fade-in text-left">
        <div className="flex flex-col items-center text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Your Research Plan is Ready!</h2>
            <p className="text-slate-600 mt-1">Here is a summary of your research requirements in plain business language.</p>
        </div>

      <div className="space-y-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Research Goal</h3>
          <p className="mt-1 text-lg text-slate-900">{cardData.goal}</p>
        </div>
        <div className="border-t border-slate-200"></div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Core Hypothesis</h3>
          <p className="mt-1 text-lg text-slate-900 italic">"{cardData.hypothesis}"</p>
        </div>
        <div className="border-t border-slate-200"></div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Key Questions</h3>
          <ul className="mt-2 list-disc list-inside space-y-1 text-slate-700">
            {cardData.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
        <div className="border-t border-slate-200"></div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Scope</h3>
          <p className="mt-1 text-slate-700">{cardData.scope}</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button
            onClick={onReset}
            type="button"
            className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
        >
            Start New Plan
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Confirm & Proceed
        </button>
      </div>
    </div>
  );
};

export default ResearchCardStep;
