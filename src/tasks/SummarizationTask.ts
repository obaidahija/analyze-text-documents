import { AnalyzerTask } from './AnalyzerTask';
import { openai } from '../llmClient';
import { DEFAULT_GPT_MODEL } from '../config/llmModelConfig';

export interface SummarizationInput {
  title: string;
  content: string;
}
export type SummarizationOutput = string;

export class SummarizationTask extends AnalyzerTask<SummarizationInput, SummarizationOutput> {
  async analyze(input: SummarizationInput): Promise<SummarizationOutput> {
    const prompt = `
Summarize the following article in 2-3 sentences, capturing its main point and most important facts in reader-friendly language. Avoid unnecessary details or repetition.

Title: ${input.title}
Content: ${input.content}

Summary:
    `;
    const completion = await openai.chat.completions.create({
      model: DEFAULT_GPT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 130,
    });
    return completion.choices[0]?.message.content?.trim() ?? '';
  }
}