import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LLMSettings } from '@/types/settings';

interface SettingsStore {
  settings: LLMSettings;
  updateSettings: (settings: LLMSettings) => void;
}

const defaultSettings: LLMSettings = {
  serverUrl: 'http://localhost',
  port: '8080',
  modelName: 'mistral-7b',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => set({ settings: newSettings }),
    }),
    {
      name: 'blog-writer-settings',
    }
  )
); 