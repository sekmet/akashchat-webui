import React from 'react';
import { User } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useStore } from '../store/useStore';
import { useNotificationStore } from '../store/useNotificationStore';

interface ProfileFormData {
  emailNotifications: boolean;
}

export default function Profile() {
  const { showNotification, hideNotification } = useNotificationStore();
  const { user } = useUser();
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<ProfileFormData>({
    emailNotifications: true
  });

  const toggleNotifications = () => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      emailNotifications: !prev.emailNotifications
    }));
  };

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
        <button
          onClick={() => setIsEditing(true)}
          className="ml-auto px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
        >
          {isEditing ? 'Editing...' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your account settings and profile information through Clerk's user management system.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferences</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email Notifications</span>
              <button
                onClick={toggleNotifications}
                className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                  formData.emailNotifications ? 'bg-blue-600' : 'bg-gray-400'
                }`}
                disabled={!isEditing}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                    formData.emailNotifications ? 'right-1' : 'left-1'
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                showNotification({
                  type: 'success',
                  message: 'Profile updated successfully'
                });
                setTimeout(hideNotification, 3000);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}