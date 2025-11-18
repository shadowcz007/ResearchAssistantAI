
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SparklesIcon className="w-12 h-12 text-indigo-500 animate-pulse" />
      <p className="mt-4 text-lg font-medium text-slate-700">AI is thinking...</p>
      <p className="text-slate-500">Crafting insights for you.</p>
    </div>
  );
};

export default Loader;
