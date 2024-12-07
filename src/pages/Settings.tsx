import React from 'react';
import { useStore } from '../store/useStore';
import { useNotificationStore } from '../store/useNotificationStore';
import Select from '../components/Select';

const models = [
  'Meta-Llama-3-3-70B-Instruct',
  'Meta-Llama-3-1-8B-Instruct-FP8',
  'Meta-Llama-3-1-405B-Instruct-FP8',
  'Meta-Llama-3-2-3B-Instruct',
  'nvidia-Llama-3-1-Nemotron-70B-Instruct-HF'
];

export default function Settings() {
  const { settings, setSettings } = useStore();
  const { showNotification, hideNotification } = useNotificationStore();
  const [formData, setFormData] = React.useState({
    systemPrompt: settings.systemPrompt || '',
    apiKey: settings.apiKey || '',
    apiUrl: settings.apiUrl || '',
    model: settings.model || '',
    temperature: settings.temperature || 0.7,
    maxTokens: settings.maxTokens || 1000,
    tavilyApiKey: settings.tavilyApiKey || '',
    uploadthingToken: settings.uploadthingToken || '',
    theme: settings.theme || 'light'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'range' ? parseFloat(e.target.value) : parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSave = () => {
    setSettings(formData);
    showNotification({
      type: 'success',
      message: 'Settings saved successfully'
    });
    setTimeout(hideNotification, 3000);
  };

  return (
    <div className="p-4 sm:p-8 mx-auto w-full mt-[67px] lg:ml-0 sm:ml-64 max-w-5xl overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            System Prompt
          </label>
          <textarea
            name="systemPrompt"
            value={formData.systemPrompt}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <Select
          label="Model"
          value={formData.model}
          onChange={(model) => setFormData(prev => ({ ...prev, model }))}
          options={models}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Temperature ({formData.temperature})
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="temperature"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={handleNumberChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Controls randomness: Lower values are more focused, higher values more creative
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Max Tokens
            </label>
            <input
              type="number"
              name="maxTokens"
              min="100"
              max="4000"
              step="100"
              value={formData.maxTokens}
              onChange={handleNumberChange}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Maximum length of the response (100-4000)
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            API Key
          </label>
          <input
            type="password"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Required for chat functionality. Get your API key from <a href="https://chatapi.akash.network/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Akash Chat API</a>
          </p>
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            API URL
          </label>
          <input
            type="url"
            name="apiUrl"
            value={formData.apiUrl}
            onChange={handleChange}
            placeholder="https://chatapi.akash.network/api/v1/chat/completions"
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Tavily API Key
          </label>
          <input
            type="password"
            name="tavilyApiKey"
            value={formData.tavilyApiKey}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Required for web search functionality. Get your API key from <a href="https://tavily.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Tavily</a>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            UploadThing Token
          </label>
          <input
            type="password"
            name="uploadthingToken"
            value={formData.uploadthingToken}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Required for file upload functionality. Get your API key from <a href="https://uploadthing.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">UploadThing</a>
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}