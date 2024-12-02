import React from 'react';
import { MessageSquarePlus, Search, MessageSquare, Home, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, SignedIn } from '@clerk/clerk-react';
import { useStore } from '../store/useStore';
import { useDebounce } from '../hooks/useDebounce';

export default function Sidebar() {
  const location = useLocation();
  const { addChat, chats, currentChat, setCurrentChat, deleteChat, setSearchQuery, getFilteredChats } = useStore();
  const { user } = useUser();
  const [searchInput, setSearchInput] = React.useState('');
  const debouncedSearch = useDebounce(searchInput, 300);
  const filteredChats = getFilteredChats();

  const handleNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    };
    
    addChat({
      ...newChat,
      title: `Chat ${chats.length + 1}`
    });
  };

  React.useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  return (
    <div className="w-64 min-w-[256px] max-w-[256px] h-screen overflow-auto bg-gray-50 dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-200 fixed z-10">
      <div className="space-y-4 p-4">
        <Link
          to="/"
          onClick={() => setCurrentChat(null)}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <button
          onClick={handleNewChat}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors"
        >
          <MessageSquarePlus size={20} />
          <span>New Chat</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={16} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
        </div>
      </div>
      <div className="flex-1 mt-4 overflow-y-auto px-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 min-h-0">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="group relative"
          >
            <Link
              to="/"
              onClick={() => setCurrentChat(chat.id)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                chat.id === currentChat
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <MessageSquare size={20} />
              <span className="truncate flex-1">{chat.title}</span>
            </Link>
            <button
              onClick={() => deleteChat(chat.id)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all duration-200"
            >
              <Trash2 size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      <SignedIn>
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/profile"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm transition-colors duration-200">
              {user?.emailAddresses[0]?.emailAddress?.[0]}{user?.emailAddresses[0]?.emailAddress?.[1]}
            </div>
            <div className="flex flex-col min-w-0">
              {/*<span className="text-gray-900 dark:text-white truncate">
                {user?.firstName} {user?.lastName}
              </span>*/}
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
            </div>
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}