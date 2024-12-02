import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { Bot, LogIn } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-[#1a1a1a]">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/20 mx-auto flex items-center justify-center mb-8">
          <Bot size={48} className="text-blue-600 dark:text-blue-400" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to Akash Chat Web UI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
        Your intelligent AI assistant powered by powered by the Akash Supercloud that anyone can access at completely zero-cost.
        </p>
        <p className="text-xl text-blue-600 font-bold dark:text-gray-400 max-w-lg mx-auto">
          Sign in to start chatting.
        </p>

        <div className="pt-8">
          <SignInButton mode="modal">
            <button className="inline-flex items-center space-x-3 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
              <LogIn size={24} />
              <span>Sign In to Get Started</span>
            </button>
          </SignInButton>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Powered by state-of-the-art language models
        </p>
      </div>
    </div>
  );
}