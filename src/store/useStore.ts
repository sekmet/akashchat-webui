import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, Chat } from '../types';

interface State {
  settings: Settings;
  chats: Chat[];
  searchQuery: string;
  currentChat: string | null;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  clearChat: () => void;
  setSettings: (settings: Partial<Settings>) => void;
  deleteChat: (chatId: string) => void;
  addChat: (chat: Chat) => void;
  setCurrentChat: (chatId: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredChats: () => Chat[];
}

const defaultSettings: Settings = {
  systemPrompt: "You are a helpful AI assistant.",
  apiKey: "",
  apiUrl: "https://api.openai.com/v1/chat/completions",
  temperature: 0.7,
  maxTokens: 1000,
  tavilyApiKey: "",
  uploadthingToken: "",
  model: "Meta-Llama-3-1-8B-Instruct-FP8",
  theme: 'dark'
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      chats: [],
      searchQuery: '',
      currentChat: null,
      updateChat: (chatId, updates) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, ...updates } : chat
          )
        })),
      clearChat: () => set({ currentChat: null }),
      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      deleteChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          currentChat: state.currentChat === chatId ? null : state.currentChat
        })),
      addChat: (chat) =>
        set((state) => ({
          chats: [...state.chats, chat],
          currentChat: chat.id
        })),
      setCurrentChat: (chatId) =>
        set({ currentChat: chatId }),
      setSearchQuery: (query) =>
        set({ searchQuery: query }),
      getFilteredChats: () => {
        const state = get();
        const { chats, searchQuery } = state;
        if (!searchQuery.trim()) return chats;
        
        const query = searchQuery.toLowerCase();
        return chats.filter(chat => {
          // Search in title
          if (chat.title.toLowerCase().includes(query)) return true;
          
          // Search in messages
          return chat.messages.some(message => 
            message.content.toLowerCase().includes(query)
          );
        });
      },
    }),
    {
      name: 'akash-storage'
    }
  )
);