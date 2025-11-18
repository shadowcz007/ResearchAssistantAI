import React, { useState } from 'react';

interface IntentClarificationStepProps {
  intents: string[];
  onNext: (intent: string) => void;
}

const IntentClarificationStep: React.FC<IntentClarificationStepProps> = ({ intents, onNext }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [customIntent, setCustomIntent] = useState('');

  const handleRadioChange = (intent: string) => {
    setSelectedOption(intent);
    setCustomIntent('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomIntent(e.target.value);
    setSelectedOption('');
  };

  const handleSubmit = () => {
    const finalIntent = selectedOption || customIntent.trim();
    if (finalIntent) {
      onNext(finalIntent);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">What is your primary goal?</h2>
      <p className="text-slate-600 mb-6">Help the AI understand your focus. Select an option or specify your own objective.</p>
      <div className="space-y-4">
        {intents.map((intent, index) => (
          <label
            key={index}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              selectedOption === intent ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500' : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <input
              type="radio"
              name="intent"
              value={intent}
              checked={selectedOption === intent}
              onChange={() => handleRadioChange(intent)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
            />
            <span className="ml-3 text-slate-700">{intent}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 relative">
        <p className="text-center text-sm text-slate-500 mb-2">or</p>
        <label htmlFor="custom-intent" className="block text-sm font-medium text-slate-700 mb-1">
          Specify your own intent
        </label>
        <input
          type="text"
          id="custom-intent"
          value={customIntent}
          onChange={handleInputChange}
          placeholder="e.g., Understand customer churn reasons"
          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        />
      </div>


      <button
        onClick={handleSubmit}
        disabled={!selectedOption && !customIntent.trim()}
        className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        Set S.M.A.R.T. Goal
      </button>
    </div>
  );
};

export default IntentClarificationStep;
