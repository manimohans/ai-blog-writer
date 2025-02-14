'use client';

import { useState } from 'react';
import SettingsPanel from '@/components/SettingsPanel';
import ContextPanel from '@/components/ContextPanel';
import BlogEditor from '@/components/BlogEditor';
import { useContextStore } from '@/store/contextStore';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const { context, updateContext } = useContextStore();

  return (
    <main className="min-h-screen p-8 bg-[#1A1A1A] font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#8A63D2]">Blog Writer</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowContext(!showContext)}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#8A63D2] px-4 py-2 rounded-md transition-colors"
            >
              {showContext ? 'Hide Context' : 'Show Context'}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#8A63D2] px-4 py-2 rounded-md transition-colors"
            >
              {showSettings ? 'Hide Settings' : 'Show Settings'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-9">
            <BlogEditor context={context} />
          </div>
          <div className="col-span-3 space-y-4">
            {showSettings && <SettingsPanel />}
            {showContext && (
              <ContextPanel 
                onContextUpdate={updateContext}
                initialContext={context}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 