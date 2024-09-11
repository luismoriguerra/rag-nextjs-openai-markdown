import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  console.log('POST CONTEXT ', context);

  // Get context in a previous step
  const relevantContent = await findRelevantContent(context);

  console.log(relevantContent);

  const result = await streamObject({
    model: openai("gpt-4o-2024-08-06", { structuredOutputs: true }),
    prompt: context,
    schema: z.object({
      content: z.string().describe('markdown formatted text answering the users question'),
    }),
    system: `You are a helpful assistant. Use the following information to answer questions in markdown format:
    ${formatRelevantContent(relevantContent)}
    If no relevant information is found, respond, "Sorry, I don't know."`,
  });

  return result.toTextStreamResponse();
}

function formatRelevantContent(content: RelevantContent[]): string {
  return content.map(item => `${item.name} (Relevance: ${(item.similarity * 100).toFixed(2)}%)`).join('\n\n');
}

interface RelevantContent {
  name: string;
  similarity: number;
}