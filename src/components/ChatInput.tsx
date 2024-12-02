import React from 'react';
import { Mic, ArrowUp, Globe, FileUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import FileUploadButton from './FileUploadButton';
import type { Message } from '../types';

interface ChatInputProps {
  onSend: (message: string) => void;
  onWebSearch: (query: string) => void;
  webSearchEnabled?: boolean;
  onWebSearchToggle?: () => void;
  onFileUpload?: (message: Message) => void;
}

export default function ChatInput({ onSend, onWebSearch, webSearchEnabled = false, onWebSearchToggle, onFileUpload }: ChatInputProps) {
  const [message, setMessage] = React.useState('');
  const { settings: { tavilyApiKey, uploadthingToken } } = useStore();

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      if (webSearchEnabled) {
        onWebSearch(message);
      } else {
        onSend(message);
      }
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleMessageSubmit} className="relative mx-auto w-full flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={webSearchEnabled ? "Search the web..." : "Send a message"}
        className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl pl-4 pr-24 py-4 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        {uploadthingToken && <FileUploadButton onUpload={onFileUpload} />}
        {tavilyApiKey && (
          <button 
            type="button"
            onClick={onWebSearchToggle}
            className={`p-2 rounded-lg transition-colors ${
              webSearchEnabled 
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            <Globe size={20} />
          </button>
        )}
        {/*<button 
          type="button"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Mic size={20} className="text-gray-500 dark:text-gray-400" />
        </button>*/}
        <button 
          type="submit" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowUp size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </form>
  );
}