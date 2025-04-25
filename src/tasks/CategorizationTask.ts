import { AnalyzerTask } from './AnalyzerTask';
import { openai } from '../llmClient'; // You will create this
import { DEFAULT_GPT_MODEL } from '../config/llmModelConfig';
import { cleanJsonRes } from '../utils/cleanJsonRes';

// The shape of the input our analyze function expects
export interface CategorizationInput {
  title: string;
  content: string;
}

export type CategorizationOutput = string[];

export class CategorizationTask extends AnalyzerTask<CategorizationInput, CategorizationOutput> {
  async analyze(input: CategorizationInput): Promise<CategorizationOutput> {
    // Prompt engineering for categorization
    const prompt = `
Given the following article, assign up to five relevant categories. Respond ONLY with a JSON array (no markdown, no explanation). Example: ["A", "B"] of categories (max 5), each as a single string.

Title: ${input.title}
Content: ${input.content}

Categories:
`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_GPT_MODEL, 
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 80,
    });

    // Parse categories from response
    try {
      const text = completion.choices[0]?.message.content?.trim() ?? '[]';
      // Will be something like ["Education", "Technology"]
      // Parse and validate
      const categories = JSON.parse(cleanJsonRes(text));
      if (Array.isArray(categories) && categories.every(c => typeof c === 'string')) {
        // Truncate to at most 5 if necessary
        return categories.slice(0, 5);
      }
      throw new Error('Invalid category format');
    } catch (err) {
      console.error(`Categorization parsing error:`, err);
      return []; // Or decide to throw, or handle as needed
    }
  }
}