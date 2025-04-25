import { AnalyzerTask } from './AnalyzerTask';
import { openai } from '../llmClient';
import { DEFAULT_GPT_MODEL } from '../config/llmModelConfig';
import { cleanJsonRes } from '../utils/cleanJsonRes';

export interface SecondaryKeywordsInput {
  title: string;
  content: string;
}

export type SecondaryKeywordsOutput = string[];

export class SecondaryKeywordsTask extends AnalyzerTask<SecondaryKeywordsInput, SecondaryKeywordsOutput> {
  async analyze(input: SecondaryKeywordsInput): Promise<SecondaryKeywordsOutput> {
    // Prompt engineering: be explicit that only the secondary keywords are wanted, return array
    const prompt = `
Given the following document, extract 3-7 important secondary keywords or key phrases 
(not including the primary keyword) that appear frequently or are relevant for understanding the main concepts. 
Only respond with a valid JSON array of strings, no explanations.

Title: ${input.title}
Content: ${input.content}

Secondary keywords:
`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_GPT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 200, // Short list
    });

    // Parsing output
    try {
      const text = completion.choices[0]?.message.content?.trim() ?? '[]';
      const keywords = JSON.parse(cleanJsonRes(text));
      if (Array.isArray(keywords) && keywords.every(item => typeof item === 'string')) {
        return keywords;
      }
      throw new Error('Invalid format for secondary keywords');
    } catch (err) {
      console.error('Secondary keywords parsing error:', err);
      return [];
    }
  }
}