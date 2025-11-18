
import React, { useState } from 'react';

interface HypothesisStepProps {
  onNext: (hypothesis: string) => void;
}

const HypothesisStep: React.FC<HypothesisStepProps> = ({ onNext }) => {
  const [hypothesis, setHypothesis] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hypothesis.trim()) {
      onNext(hypothesis.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">What is your core hypothesis?</h2>
      <p className="text-slate-600 mb-6">Share your intuition or educated guess. This will be the central theme of the analysis. For example, "I believe our new marketing campaign is not reaching the right audience."</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
          placeholder="e.g., I believe competitors have launched a better product..."
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          rows={4}
        />
        <button
          type="submit"
          disabled={!hypothesis.trim()}
          className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          Generate Research Card
        </button>
      </form>
    </div>
  );
};

export default HypothesisStep;
