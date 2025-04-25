import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers";
import { z } from "zod";
import { AnalyzeResponse } from "../types/analyze";


const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
});

const AnalyzeResultSchema = z.object({
  summary: z.string().describe("A concise summary (1-3 sentences) that captures the essence of the article."),
  categories: z
    .array(z.string().describe("A category"))
    .max(5)
    .describe("A list of up to five relevant categories for the article."),
  primaryKeyword: z
    .string()
    .describe("The single most important keyword or short key phrase that summarizes the article's main topic."),
  secondaryKeywords: z
    .array(z.string().describe("An important secondary keyword or phrase relevant for deeper understanding, excluding the primary keyword."))
    .describe("A list of 3-7 secondary keywords or phrases that are important in the article, excluding the primary keyword."),
  sentiment: z
    .enum(["positive", "negative", "neutral"])
    .describe("The overall sentiment of the article as one of: positive, negative, or neutral."),
});

const parser = StructuredOutputParser.fromZodSchema(AnalyzeResultSchema);
const fixingParser = OutputFixingParser.fromLLM(chat, parser);

export async function lcStructuredAnalyze(title: string, content: string): Promise<AnalyzeResponse> {
  const prompt = `
Analyze the following article. Respond STRICTLY as the following JSON schema (and nothing else):
${parser.getFormatInstructions()}

Article title: ${title}
Article content: ${content}
  `.trim();

  const result = await chat.invoke([new HumanMessage(prompt)]);
  return fixingParser.parse(result.content as string); // fully validated, with field meaning passed to the LLM!
}