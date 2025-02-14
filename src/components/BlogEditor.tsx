import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { useSettingsStore } from '@/store/settingsStore';
import { BlogContext } from '@/types/settings';
import axios from 'axios';

interface BlogEditorProps {
  context: BlogContext;
}

export default function BlogEditor({ context }: BlogEditorProps) {
  const [outline, setOutline] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { settings } = useSettingsStore();

  const generateBlog = async () => {
    setIsLoading(true);
    const prompt = `Write a blog post following this outline:
${outline}

Writing Style:
- Tone: ${context.tone}
- Writing Rules: ${context.rules.join(', ')}`;

    console.log('Generating blog with:', {
      endpoint: `${settings.serverUrl}:${settings.port}/api/generate`,
      model: settings.modelName,
      prompt: prompt,
      context: context
    });

    try {
      const response = await axios.post(
        `${settings.serverUrl}:${settings.port}/api/generate`,
        {
          model: settings.modelName,
          prompt: prompt,
          stream: false
        }
      );
      console.log('Response received:', response.data);
      setContent(response.data.response || 'No content generated');
    } catch (error) {
      console.error('Error generating blog:', error);
      setContent('Error generating blog. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Log context whenever it changes
  useEffect(() => {
    console.log('Context updated:', context);
  }, [context]);

  return (
    <div className="space-y-6">
      <div className="flex space-x-6">
        <div className="w-1/2 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#8A63D2]">Blog Outline</h2>
            <button
              onClick={generateBlog}
              disabled={isLoading || !outline.trim()}
              className={`
                px-4 py-1.5 rounded-md text-sm font-medium transition-all
                ${isLoading || !outline.trim()
                  ? 'bg-[#2A2A2A] text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-[#8A63D2] text-white hover:bg-[#7952B3] active:transform active:scale-95'
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Blog'
              )}
            </button>
          </div>
          <textarea
            className="w-full h-[550px] p-3 rounded-lg bg-[#1E1E1E] text-gray-200 border border-[#3A3A3A] 
                     focus:border-[#8A63D2] focus:ring-1 focus:ring-[#8A63D2] font-mono text-sm
                     placeholder-gray-500 resize-none transition-colors"
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            placeholder={`Write your blog outline here...

Example:
1. Introduction
   - Background
   - Main points
2. First Topic
   - Key concepts
   - Examples
3. Conclusion
   - Summary
   - Call to action`}
          />
          <p className="text-xs text-gray-400">
            Pro tip: Use bullet points and numbers to structure your outline
          </p>
        </div>
        <div className="w-1/2 space-y-2">
          <h2 className="text-lg font-semibold text-[#8A63D2]">Generated Content</h2>
          <div
            className="prose prose-invert prose-sm max-w-none w-full h-[550px] p-3 rounded-lg 
                     bg-[#1E1E1E] border border-[#3A3A3A] overflow-y-auto text-gray-200 
                     font-mono text-sm scrollbar-thin scrollbar-thumb-[#3A3A3A] 
                     scrollbar-track-[#1E1E1E]"
            dangerouslySetInnerHTML={{ 
              __html: content 
                ? marked(content) 
                : '<p class="text-gray-400">Your generated blog post will appear here...</p>' 
            }}
          />
          <p className="text-xs text-gray-400">
            {content ? 'Content generated using ' + settings.modelName : 'Ready to generate content'}
          </p>
        </div>
      </div>
    </div>
  );
} 