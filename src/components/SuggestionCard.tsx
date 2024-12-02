import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestionCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export default function SuggestionCard({ title, description, onClick }: SuggestionCardProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 text-left group hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-gray-900 dark:text-white font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Prompt</span>
        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
      </div>
    </button>
  );
}