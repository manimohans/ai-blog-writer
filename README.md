# AI Blog Writer

A modern web application that helps you generate blog posts using your local LLM (Language Learning Model) through Ollama.

Hosted version: https://blog-writer-gamma.vercel.app/

<img width="1207" alt="image" src="https://github.com/user-attachments/assets/9f7a43f4-3243-40e4-97eb-5c1576af1df7" />


## Features

- 🚀 Generate blog posts from outlines
- 🎨 Customizable writing tone and style rules
- ⚙️ Connect to your local LLM (Ollama)
- 💾 Persistent settings and context
- 🎯 Clean, modern UI

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand for state management
- Marked for Markdown rendering
- Axios for API requests

## Prerequisites

- Node.js 18+ installed
- [Ollama](https://ollama.ai) installed and running
- A compatible LLM model (e.g., phi4, llama3.2)

## Installation

1. Clone the repository:
bash
git clone https://github.com/yourusername/blog-writer.git
cd blog-writer
2. Install dependencies:
bash
npm install

3. Create a `.env.local` file in the root directory:
env
NEXT_PUBLIC_DEFAULT_MODEL=mistral-7b

4. Start the development server:
bash
npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setting up Ollama

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull your preferred model:
bash
ollama pull mistral-7b

3. Run the model:
bash
ollama run mistral-7b

## CORS Configuration

For local development, you'll need to handle CORS. Options include:

1. Using a CORS proxy
2. Setting up Ollama with appropriate CORS headers
3. Using ngrok for testing

## Deployment

### Vercel Deployment

1. Fork this repository
2. Connect your fork to Vercel
3. Deploy
4. Configure your local Ollama instance to accept requests

### Self-hosting

1. Build the application:
bash
npm run build

2. Run the application:
bash
npm run start

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
