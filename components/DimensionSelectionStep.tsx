
import React, { useState } from 'react';

interface DimensionSelectionStepProps {
  dimensions: string[];
  onNext: (selectedDimensions: string[]) => void;
}

const DimensionSelectionStep: React.FC<DimensionSelectionStepProps> = ({ dimensions, onNext }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (dimension: string) => {
    setSelected(prev =>
      prev.includes(dimension)
        ? prev.filter(d => d !== dimension)
        : [...prev, dimension]
    );
  };

  const handleSubmit = () => {
    onNext(selected);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Select Analysis Dimensions</h2>
      <p className="text-slate-600 mb-6">Choose the key areas to investigate. The AI has suggested these based on your goal.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {dimensions.map((dim, index) => (
          <label
            key={index}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all text-sm text-center justify-center ${
              selected.includes(dim)
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(dim)}
              onChange={() => handleToggle(dim)}
              className="hidden"
            />
            <span className="text-slate-700 font-medium">{dim}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        Input Hypothesis
      </button>
    </div>
  );
};

export default DimensionSelectionStep;
