import { useStore } from '../store/useStore';
import type { Message, Chat } from '../types';

interface ChatCompletion {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export async function createChatCompletion(messages: Message[]) {
  const { settings } = useStore.getState();
  
  if (!settings.apiKey) {
    throw new Error('API key not configured');
  }

  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  const response = await fetch(settings.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: formattedMessages,
      temperature: settings.temperature,
      max_tokens: settings.maxTokens
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to send message');
  }

  const data: ChatCompletion = await response.json();
  return {
    role: data.choices[0].message.role as Message['role'],
    content: data.choices[0].message.content
  };
}

export async function sendMessage(messages: Message[]) {
  const response = await createChatCompletion(messages);
  return response.content;
}