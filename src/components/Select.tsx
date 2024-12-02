import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  className?: string;
}

export default function Select({ value, onChange, options, label, className = '' }: SelectProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg pl-3 pr-10 py-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 appearance-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={20} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" 
        />
      </div>
    </div>
  );
}