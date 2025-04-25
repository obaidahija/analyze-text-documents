import { AnalyzerTask } from './AnalyzerTask';
import { openai } from '../llmClient';
import { DEFAULT_GPT_MODEL } from '../config/llmModelConfig';

export interface PrimaryKeywordInput {
  title: string;
  content: string;
}

export type PrimaryKeywordOutput = string;

export class PrimaryKeywordTask extends AnalyzerTask<PrimaryKeywordInput, PrimaryKeywordOutput> {
  async analyze(input: PrimaryKeywordInput): Promise<PrimaryKeywordOutput> {
    // LLM prompt: ask for only the single most relevant keyword/phrase
    const prompt = `
Given the following document, extract ONLY the single most important keyword or short key phrase that best represents the main topic. 
Respond with JUST the keyword or phrase, and nothing else (no quotes or extra text).

Title: ${input.title}
Content: ${input.content}

Primary keyword:
`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_GPT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 10, // Short output
    });

    // Return clean string
    const keyword = completion.choices[0]?.message.content?.trim() ?? '';
    return keyword;
  }
}