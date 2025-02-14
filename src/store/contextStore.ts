import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogContext } from '@/types/settings';

interface ContextStore {
  context: BlogContext;
  updateContext: (context: BlogContext) => void;
}

const defaultContext: BlogContext = {
  tone: '',
  rules: [],
};

export const useContextStore = create<ContextStore>()(
  persist(
    (set) => ({
      context: defaultContext,
      updateContext: (newContext) => set({ context: newContext }),
    }),
    {
      name: 'blog-writer-context',
    }
  )
); 