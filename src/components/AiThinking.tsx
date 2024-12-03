import React from 'react';
import { Bot } from 'lucide-react';

interface AiThinkingProps {
  message?: string;
}

export default function AiThinking({ message = 'Generating' }: AiThinkingProps) {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <Bot size={24} className="text-blue-600 dark:text-blue-400 animate-bounce" />
        <div className="absolute bottom-2 -right-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping" />
      </div>
      <span className="min-w-[80px]">{message}{dots}</span>
    </div>
  );
}