
import React, { useState } from 'react';

interface UserInputStepProps {
  onNext: (problem: string) => void;
}

const UserInputStep: React.FC<UserInputStepProps> = ({ onNext }) => {
  const [problem, setProblem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      onNext(problem.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">What's on your mind?</h2>
      <p className="text-slate-600 mb-6">Describe the problem or opportunity you want to investigate. For example, "Our Q3 sales are down by 15%."</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="e.g., Sales have declined..."
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          rows={4}
        />
        <button
          type="submit"
          disabled={!problem.trim()}
          className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          Clarify with AI
        </button>
      </form>
    </div>
  );
};

export default UserInputStep;
