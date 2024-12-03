import React from 'react';
import { Settings as SettingsIcon, LogIn, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNotificationStore } from '../store/useNotificationStore';
import ModelSelector from './ModelSelector';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { notification } = useNotificationStore();

  return (
    <div className="fixed min-h-[60px] w-full bg-white dark:bg-[#1a1a1a] z-10">
      <div className="flex items-center justify-between p-4 w-full border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Akash Chat</h1>
          <ModelSelector className="hidden md:block" />

          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Link to="/settings" className="sm:block">
            <SettingsIcon size={20} className="text-gray-500 dark:text-gray-400" />
          </Link>
          <ThemeToggle />
        </div>        
      </div>
      
      {notification && (
        <div className={`
          transition-all duration-300 ease-in-out
          ${notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 border-green-500' : ''}
          ${notification.type === 'error' ? 'bg-red-100 dark:bg-red-900/20 border-red-500' : ''}
          ${notification.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-500' : ''}
          border-l-4 p-4
        `}>
          <div className="flex items-center space-x-2">
            <span className={`font-medium
              ${notification.type === 'success' ? 'text-green-600 dark:text-green-500' : ''}
              ${notification.type === 'error' ? 'text-red-600 dark:text-red-500' : ''}
              ${notification.type === 'info' ? 'text-blue-600 dark:text-blue-500' : ''}
            `}>
              {notification.type.toUpperCase()}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {notification.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}