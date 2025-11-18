
import React, { useState, useEffect } from 'react';
import { SmartGoal } from '../types';

interface SmartGoalStepProps {
  initialGoal: SmartGoal | null;
  onNext: (goal: SmartGoal) => void;
}

const SmartGoalStep: React.FC<SmartGoalStepProps> = ({ initialGoal, onNext }) => {
  const [goal, setGoal] = useState<SmartGoal>({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  });

  useEffect(() => {
    if (initialGoal) {
      setGoal(initialGoal);
    }
  }, [initialGoal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(goal);
  };
  
  const isFormValid = Object.values(goal).every(field => field.trim() !== '');

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Define Your S.M.A.R.T. Goal</h2>
      <p className="text-slate-600 mb-6">The AI has drafted a goal based on your input. Feel free to refine it.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="specific" className="block text-sm font-medium text-slate-700">Specific</label>
          <input type="text" name="specific" id="specific" value={goal.specific} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
        </div>
        <div>
          <label htmlFor="measurable" className="block text-sm font-medium text-slate-700">Measurable</label>
          <input type="text" name="measurable" id="measurable" value={goal.measurable} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
        </div>
        <div>
          <label htmlFor="achievable" className="block text-sm font-medium text-slate-700">Achievable</label>
          <input type="text" name="achievable" id="achievable" value={goal.achievable} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
        </div>
        <div>
          <label htmlFor="relevant" className="block text-sm font-medium text-slate-700">Relevant</label>
          <input type="text" name="relevant" id="relevant" value={goal.relevant} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
        </div>
        <div>
          <label htmlFor="timeBound" className="block text-sm font-medium text-slate-700">Time-bound</label>
          <input type="text" name="timeBound" id="timeBound" value={goal.timeBound} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          Select Analysis Dimensions
        </button>
      </form>
    </div>
  );
};

export default SmartGoalStep;
