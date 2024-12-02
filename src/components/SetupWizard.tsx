import React from 'react';
import { useStore } from '../store/useStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: 'Welcome',
    description: 'Let\'s get your Akash Chat environment set up. You\'ll need your API credentials to continue.'
  },
  {
    title: 'API Configuration',
    description: 'Enter your API credentials to connect with the language model.'
  },
  {
    title: 'Customize',
    description: 'Configure your chat experience.'
  }
];

export default function SetupWizard() {
  const { settings, setSettings } = useStore();
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [formData, setFormData] = React.useState({
    apiKey: '',
    apiUrl: 'https://chatapi.akash.network/api/v1/chat/completions',
    model: 'Meta-Llama-3-1-8B-Instruct-FP8',
    systemPrompt: 'You are a helpful AI assistant.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setSettings(formData);
      setIsVisible(false);
      showNotification({
        type: 'success',
        message: 'Setup completed successfully!'
      });
      navigate('/');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.apiKey.trim() !== '' && formData.apiUrl.trim() !== '';
    }
    return true;
  };

  return (
    isVisible ? (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {steps[currentStep].title}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="space-y-6">
          {currentStep === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key *
                </label>
                <input
                  type="password"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your API key"
                  required
                />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Required for chat functionality. Get your API key from <a href="https://chatapi.akash.network/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Akash Chat API</a>
              </p>
                
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API URL *
                </label>
                <input
                  type="url"
                  name="apiUrl"
                  value={formData.apiUrl}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter API URL"
                  required
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  System Prompt
                </label>
                <textarea
                  name="systemPrompt"
                  value={formData.systemPrompt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={`px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
              isStepValid()
                ? 'hover:bg-blue-700'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
      </div>
    ) : null
  );
}