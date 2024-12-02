export interface Settings {
  systemPrompt: string;
  apiKey: string;
  apiUrl: string;
  model: string;
  tavilyApiKey: string;
  uploadthingToken: string;
  theme: 'light' | 'dark';
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  fileType?: string;
  fileName?: string;
  fileUrl?: string;
}