import React from 'react';
import { User, ExternalLink } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';

export default function Profile() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto w-full mt-[60px]">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center transition-colors duration-200">
          <User size={40} className="text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center sm:text-left">{user?.firstName} {user?.lastName}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">{user?.emailAddresses[0]?.emailAddress}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-4">
              Manage your account settings and profile information through Clerk's user management system.
            </p>
            <button
              onClick={() => openUserProfile()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <span>Manage Account</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferences</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              Your preferences are managed through your Clerk account settings.
              Click the "Manage Account" button above to update your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}