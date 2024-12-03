import React, { useState } from 'react';
import { Bot, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import AiThinking from '../components/AiThinking';
import SetupWizard from '../components/SetupWizard';
import { getRandomSuggestions } from '../utils/suggestions';
import { createChatCompletion } from '../utils/api';
import { searchWeb } from '../utils/webSearch';
import { parseFile } from '../utils/fileUpload';
import { getFileContent, clearFileContent } from '../utils/storage';
import MarkdownContent from '../components/MarkdownContent';
import type { Message, Chat } from '../types';
import ChatInput from '../components/ChatInput';
import SuggestionCard from '../components/SuggestionCard';

export default function Chat() {
  const { settings, chats, currentChat, updateChat, addChat } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(!settings.apiKey);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState(getRandomSuggestions());
  const navigate = useNavigate();
  const [isSendingPrompt, setIsSendingPrompt] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [fileIcon, setFileIcon] = React.useState<JSX.Element>(<FileText size={16} />);
  const currentMessages = chats.find(chat => chat.id === currentChat)?.messages || [];
  const [pendingFileMessage, setPendingFileMessage] = React.useState<Message | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);
  
  React.useEffect(() => {
    if (currentChat) {
      navigate('/', { replace: true });
    }
  }, [currentChat, navigate]);

  const handleSuggestionClick = async (suggestion: typeof displayedSuggestions[0]) => {
    if (isSendingPrompt) return;
    setIsSendingPrompt(true);
    setIsLoading(true);
    
    try {
      const chatId = crypto.randomUUID();
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: suggestion.description,
        timestamp: new Date()
      };
    
      // Create chat with initial message
      addChat({
        id: chatId,
        title: suggestion.title,
        messages: [newMessage],
        createdAt: new Date()
      });

      // Get AI response
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: 'system',
        content: settings.systemPrompt,
        timestamp: new Date()
      };

      const response = await createChatCompletion([systemMessage, newMessage]);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: response.role,
        content: response.content,
        timestamp: new Date()
      };

      updateChat(chatId, { messages: [newMessage, assistantMessage] });
    } catch (error) {
      console.error('Failed to process suggestion:', error);
    } finally {
      setIsSendingPrompt(false);
      setIsLoading(false);
    }
  };

  const handleWebSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Store original query for user message
      const userQuery = query;
      
      // Get search results and create enhanced prompt for AI
      const searchResults = await searchWeb(query); 
      const enhancedPrompt = searchResults 
        ? `${searchResults}${query}`
        : query;
      
      // Add user's original message
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: userQuery,
        timestamp: new Date()
      };

      let chatId = currentChat;
      if (!currentChat) {
        const newChat = {
          id: crypto.randomUUID(),
          title: userQuery.trim().slice(0, 30) + (userQuery.length > 30 ? '...' : ''),
          messages: [],
          createdAt: new Date()
        };
        addChat(newChat);
        chatId = newChat.id;
      }

      const messages = chatId === currentChat ? [...currentMessages, newMessage] : [newMessage];
      updateChat(chatId!, { messages });

      // Send enhanced prompt to AI
      try {
        const systemMessage: Message = {
          id: crypto.randomUUID(),
          role: 'system',
          content: settings.systemPrompt,
          timestamp: new Date()
        };

        const response = await createChatCompletion([systemMessage, ...messages.slice(0, -1), { ...newMessage, content: enhancedPrompt }]);
        
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: response.role,
          content: response.content,
          timestamp: new Date()
        };

        updateChat(chatId!, { messages: [...messages, assistantMessage] });
      } catch (error) {
        console.error('Failed to get AI response:', error);
      }
    } catch (error) {
      console.error('Web search failed:', error);
      await handleSendMessage(query);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (message: Message) => {
    setPendingFileMessage(message);
    let chatId = currentChat;
    if (!currentChat) {
      const newChat = {
        id: crypto.randomUUID(),
        title: message.fileName || 'New Chat',
        messages: [],
        createdAt: new Date()
      };
      addChat(newChat);
      chatId = newChat.id;
    }
    updateChat(chatId!, { messages: [...currentMessages, message] });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    if (webSearchEnabled) {
      await handleWebSearch(content);
      return;
    }

    let chatId = currentChat;
    if (!currentChat) {
      const newChat = {
        id: crypto.randomUUID(),
        title: content.trim().slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date()
      };
      addChat(newChat);
      chatId = newChat.id;
    }

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    const messages = chatId === currentChat ? [...currentMessages, newMessage] : [newMessage];
    updateChat(chatId!, { messages });
    setIsLoading(true);
    
    let enhancedContent = content;
    
    // If there's a pending file message, parse it and include in the prompt
    if (pendingFileMessage?.fileUrl) {
      try {
        // Try to get content from storage first
        const storedContent = getFileContent(pendingFileMessage.fileName!);
        if (storedContent) {
          enhancedContent = `File content:\n${storedContent}\n\nUser query: ${content}`;
          // Clear the stored content after using it
          clearFileContent(pendingFileMessage.fileName!);
        } else {
          // Fallback to fetching and parsing if not in storage
          const response = await fetch(pendingFileMessage.fileUrl);
          const file = await response.blob();
          const fileContent = await parseFile(file as File);
          enhancedContent = `File content:\n${fileContent}\n\nUser query: ${content}`;
        }
      } catch (error) {
        console.error('Failed to parse file:', error);
      }
      setPendingFileMessage(null);
    }

    try {
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: 'system',
        content: settings.systemPrompt,
        timestamp: new Date()
      };

      //const response = await createChatCompletion([systemMessage, ...messages]);
      const response = await createChatCompletion([systemMessage, ...messages.slice(0, -1), { ...newMessage, content: enhancedContent }]);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: response.role,
        content: response.content,
        timestamp: new Date()
      };

      updateChat(chatId!, { messages: [...messages, assistantMessage] });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {showSetupWizard && <SetupWizard />}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 mt-[60px]">
        {currentMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full px-4 mt-[60px]">
            <div className="text-center space-y-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 mx-auto flex items-center justify-center">
                <Bot size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Akash Chat WebUI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                How can I help you today?
              </p>
            </div>
            
            <div className="w-full">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 flex items-center">
                <span className="mr-2">✨</span> Suggested
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedSuggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={index}
                    title={suggestion.title}
                    description={suggestion.description}
                    onClick={() => handleSuggestionClick(suggestion)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentMessages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 prose dark:prose-invert max-w-full sm:max-w-[80%]'
              }`}
            >
              {message.role === 'user' ? (
                message.fileUrl ? (
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-white" />
                    <MarkdownContent content={message.content} className="!text-white" />
                  </div>
                ) : (
                  <span className="whitespace-pre-wrap">{message.content}</span>
                )
              ) : (
                <MarkdownContent content={message.content} />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex justify-start">
            <AiThinking message={webSearchEnabled ? 'Searching web' : 'Generating'} />
          </div>
        )}
      </div>
      <div className="sticky bottom-0 p-4 bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-800">
        <ChatInput 
          onSend={handleSendMessage} 
          onWebSearch={handleWebSearch}
          onFileUpload={handleFileUpload}
          webSearchEnabled={webSearchEnabled}
          onWebSearchToggle={() => setWebSearchEnabled(!webSearchEnabled)}
        />
        <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
          LLMs can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}