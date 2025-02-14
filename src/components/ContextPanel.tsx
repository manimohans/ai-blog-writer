import { useState } from 'react';
import { BlogContext } from '@/types/settings';

interface ContextPanelProps {
  onContextUpdate: (context: BlogContext) => void;
  initialContext: BlogContext;
}

export default function ContextPanel({ onContextUpdate, initialContext }: ContextPanelProps) {
  const [localContext, setLocalContext] = useState<BlogContext>(initialContext);
  const [newRule, setNewRule] = useState('');

  const addRule = () => {
    if (newRule) {
      setLocalContext({
        ...localContext,
        rules: [...localContext.rules, newRule],
      });
      setNewRule('');
    }
  };

  const deleteRule = (indexToDelete: number) => {
    setLocalContext({
      ...localContext,
      rules: localContext.rules.filter((_, index) => index !== indexToDelete),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContextUpdate(localContext);
  };

  return (
    <div className="p-3 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] font-mono text-sm">
      <h2 className="text-lg font-bold mb-3 text-[#8A63D2]">Blog Context</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Writing Tone
            </label>
            <input
              type="text"
              className="mt-0.5 block w-full rounded-md bg-[#1A1A1A] border-[#3A3A3A] text-gray-200 focus:border-[#8A63D2] focus:ring-[#8A63D2] text-sm py-1"
              value={localContext.tone}
              onChange={(e) => setLocalContext({ ...localContext, tone: e.target.value })}
              placeholder="e.g., Professional, Casual, Technical"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Writing Rules
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="block w-full rounded-md bg-[#1A1A1A] border-[#3A3A3A] text-gray-200 focus:border-[#8A63D2] focus:ring-[#8A63D2] text-sm py-1"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Enter writing rule"
              />
              <button
                type="button"
                onClick={addRule}
                className="bg-[#1A1A1A] hover:bg-[#3A3A3A] text-[#8A63D2] px-3 py-1 rounded-md transition-colors text-sm"
              >
                Add
              </button>
            </div>
            <ul className="mt-1.5 space-y-0.5 max-h-24 overflow-y-auto">
              {localContext.rules.map((rule, index) => (
                <li 
                  key={index} 
                  className="text-xs text-gray-400 flex items-center justify-between group"
                >
                  <span>{rule}</span>
                  <button
                    type="button"
                    onClick={() => deleteRule(index)}
                    className="text-gray-500 hover:text-[#8A63D2] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#3A3A3A] text-[#8A63D2] px-4 py-2 rounded-md transition-colors mt-4"
          >
            Save Context
          </button>
        </div>
      </form>
    </div>
  );
} 