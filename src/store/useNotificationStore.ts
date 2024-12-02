import { create } from 'zustand';

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface NotificationStore {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notification: null,
  showNotification: (notification) => set({ notification }),
  hideNotification: () => set({ notification: null }),
}));