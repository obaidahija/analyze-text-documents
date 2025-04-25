LLM Text Analyzer API
A modular Node.js/TypeScript API that uses state-of-the-art Large Language Models (LLMs) to analyze text documents. This API delivers content summarization, topic categorization, keyword extraction, and sentiment analysis—all available via a straightforward REST interface.

## Quick Start
Get started developing...

You need to create a .env file and configure it
- OPENAI_API_KEY=sk-...
- OPENAI_GPT_MODEL=gpt-4o
- PORT=3000



```shell
# install deps
npm install

# run in development mode
npm run dev

# run in development mode in debug
npm run dev:debug

```

---


### Features Summarization: 
Two Modern Approaches: Standard OpenAI SDK and advanced LangChain (with JSON Schema enforcement).
Why Two Approaches?
- /analyze uses OpenAI's SDK directly, with tasks as separate, testable classes. This is simple and great for straightforward LLM use.
- /analyze-advanced uses LangChain with Zod JSON Schema enforcement. This approach:
Guarantees type-safe, structured API responses (no parsing/guessing LLM output)
Eases switching models or adding other AI toolchains
Supports rapid extension as the LLM ecosystem evolves
LangChain is included even though it wasn’t originally requested, because it’s quickly becoming the standard for robust, maintainable LLM pipelines, especially when you need strong guarantees about model output.

## API Endpoints
#### POST /analyze
Uses the OpenAI SDK directly with modular task classes

```shell

Request:

{
  "title": "Machine Learning Basics",
  "content": "Full text content goes here..."
}
Response:

{
  "summary": "A concise overview...",
  "categories": ["Education", "Technology", "Artificial Intelligence"],
  "primaryKeyword": "machine learning",
  "secondaryKeywords": ["algorithms", "neural networks", "data"],
  "sentiment": "positive"
}


```

---



#### POST /analyze-advanced
Uses LangChain with strict JSON schema for output

Same request and response shape as /analyze.
Returns output guaranteed to match your API contract using the latest LLM function-calling and schema enforcement.

Running the App
1. Clone and Install
git clone https://github.com/obaidaabu/llm-text-analyzer.git
cd llm-text-analyzer
npm install
2. Environment Variables
- Create a .env in the project root:
- OPENAI_API_KEY=sk-...
- OPENAI_GPT_MODEL=gpt-4o
- PORT=3000
3. Start the Server
npm run dev
# Or for debug mode:
npm run dev:debug


### Project Structure
- src/
- -  controllers/        // Express controllers for routing
- -  routes/             // Express route definitions
- -  services/           // Aggregates LLM tasks, orchestrates analysis
- -  tasks/              // Task classes (summarizer, categorizer, etc.) for OpenAI SDK route
- -  langchain/          // LangChain pipelines (with strict typing)
- -  utils/              // Shared utilities (text cleaner etc.)
- -  types/              // Shared TypeScript types & interfaces
- -  config/             // Central config (model selection, etc.)
- -  llmClient.ts        // OpenAI SDK client setup
- -  index.ts            // Main entrypoint, Express app


Each LLM task is its own class or pipeline (easier to test, maintain,/or swap in future).
Service layer composes the tasks for the API response.
Utilities (like cleanText) keep all text normalized for best LLM results.
By separating the LangChain and native OpenAI SDK logic, we enable smooth upgrades and easy comparison between APIs.

### Customization
Add more LLM tasks: Drop a new class in /tasks or pipeline in /langchain.
Switch GPT models: Edit your .env or the config—no code changes needed.
Extend schemas/types: Edit one file in /types.

