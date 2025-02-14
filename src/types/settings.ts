export interface LLMSettings {
  serverUrl: string;
  port: string;
  modelName: string;
}

export interface BlogContext {
  tone: string;
  rules: string[];
} 