import { useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

export default function SettingsPanel() {
  const { settings, updateSettings } = useSettingsStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showWarnings, setShowWarnings] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
  };

  return (
    <div className="p-4 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] font-mono">
      <h2 className="text-xl font-bold mb-4 text-[#8A63D2]">LLM Settings</h2>
      
      {/* Warnings Section */}
      <div className="mb-4 bg-[#1E1E1E] rounded border border-yellow-600/20">
        <button
          onClick={() => setShowWarnings(!showWarnings)}
          className="w-full p-2 flex items-center justify-between text-yellow-200/80 text-xs hover:bg-[#2A2A2A] transition-colors"
        >
          <span>⚠️ Important Setup Information</span>
          <span className="text-lg">{showWarnings ? '−' : '+'}</span>
        </button>
        {showWarnings && (
          <div className="p-3 text-yellow-200/80 text-xs border-t border-yellow-600/20">
            <p>To use with a local LLM server:</p>
            <ol className="list-decimal ml-4 mt-2 space-y-1">
              <li>Make sure Ollama is running on your machine</li>
              <li>You need to run a CORS proxy or configure Ollama with CORS headers</li>
              <li>Read how to modify OLLAMA_ORIGINS</li>
              <li>Default Ollama port is 11434</li>
            </ol>
          </div>
        )}
      </div>

      {/* Instructions Section */}
      <div className="mb-4 bg-[#1E1E1E] rounded border border-blue-500/20">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full p-2 flex items-center justify-between text-blue-200/80 text-xs hover:bg-[#2A2A2A] transition-colors"
        >
          <span>📖 Ollama Usage Instructions</span>
          <span className="text-lg">{showInstructions ? '−' : '+'}</span>
        </button>
        {showInstructions && (
          <div className="p-3 text-blue-200/80 text-xs border-t border-blue-500/20">
            <ol className="list-decimal ml-4 space-y-1">
              <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ollama.ai</a></li>
              <li>Run <code className="bg-[#2A2A2A] px-1 rounded">ollama run modelName</code> in your terminal</li>
              <li>Make sure your local server is CORS enabled</li>
              <li>Make sure the model specified in settings matches your installed model</li>
              <li>Test connection with small prompts first (e.g. how to appease a crying toddler)</li>
            </ol>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Server URL
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-[#1A1A1A] border-[#3A3A3A] text-gray-200 focus:border-[#8A63D2] focus:ring-[#8A63D2]"
              value={localSettings.serverUrl}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, serverUrl: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Port
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-[#1A1A1A] border-[#3A3A3A] text-gray-200 focus:border-[#8A63D2] focus:ring-[#8A63D2]"
              value={localSettings.port}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, port: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Model Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-[#1A1A1A] border-[#3A3A3A] text-gray-200 focus:border-[#8A63D2] focus:ring-[#8A63D2]"
              value={localSettings.modelName}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, modelName: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#3A3A3A] text-[#8A63D2] px-4 py-2 rounded-md transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
} 