import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ThemeToggle() {
  const { settings, setSettings } = useStore();
  
  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    setSettings({ ...settings, theme: newTheme });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
    >
      {settings.theme === 'dark' ? (
        <Sun size={20} className="text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon size={20} className="text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
}