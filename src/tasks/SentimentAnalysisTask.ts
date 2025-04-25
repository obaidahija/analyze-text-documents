import { AnalyzerTask } from './AnalyzerTask';
import { openai } from '../llmClient';
import { DEFAULT_GPT_MODEL } from '../config/llmModelConfig';

export interface SentimentAnalysisInput {
  title: string;
  content: string;
}
export type SentimentAnalysisOutput = "positive" | "negative" | "neutral";

export class SentimentAnalysisTask extends AnalyzerTask<SentimentAnalysisInput, SentimentAnalysisOutput> {
  async analyze(input: SentimentAnalysisInput): Promise<SentimentAnalysisOutput> {
    const prompt = `
Given the following article, classify its overall sentiment as one of exactly these single words: "positive", "negative", or "neutral".
Respond with only that single word, nothing else.

Title: ${input.title}
Content: ${input.content}

Sentiment:
    `;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_GPT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 2,
    });

    const text = completion.choices[0]?.message.content?.trim().toLowerCase() as SentimentAnalysisOutput ?? 'neutral';

    // Ensure only allowed values are returned, fallback to "neutral"
    if (text === 'positive' || text === 'negative' || text === 'neutral') {
      return text;
    }
    return 'neutral';
  }
}