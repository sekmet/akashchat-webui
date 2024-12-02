import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Profile {
  displayName: string;
  email: string;
  emailNotifications: boolean;
}

interface ProfileStore {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const defaultProfile: Profile = {
  displayName: 'Timothy J. Baek',
  email: 'timothy@example.com',
  emailNotifications: true
};

export const useProfile = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates }
        })),
    }),
    {
      name: 'akash-profile'
    }
  )
);