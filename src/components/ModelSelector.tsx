import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNotificationStore } from '../store/useNotificationStore';

const models = [
  'Meta-Llama-3-1-8B-Instruct-FP8',
  'Meta-Llama-3-1-405B-Instruct-FP8',
  'Meta-Llama-3-2-3B-Instruct',
  'nvidia-Llama-3-1-Nemotron-70B-Instruct-HF'
];

export default function ModelSelector() {
  const { settings, setSettings } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const { showNotification, hideNotification } = useNotificationStore();

  const handleSelect = (model: string) => {
    setSettings({ model });
    setIsOpen(false);
    showNotification({
      type: 'success',
      message: `Akash Chat - Model ${model} updated successfully.`
    });
    setTimeout(hideNotification, 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors text-sm"
      >
        <span className="max-w-[200px] truncate">{settings.model}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
            {models.map((model) => (
              <button
                key={model}
                onClick={() => handleSelect(model)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  model === settings.model
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}