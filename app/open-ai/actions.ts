'use server';

import { messagesValidator } from "@/schema";
import OpenAI from "openai";

function getMessagesWithRole(messages: string[]): {
  content: string;
  role: 'system' | 'user' | 'assistant'
}[] {
  const initialMessage = {
    content: messages.shift()!,
    role: 'system',
  } as const;

  const nextMessages: Array<{
    content: string,
    role: 'user' | 'assistant' 
  }> = messages.map(
    (message, index) => ({
      content: message,
      role: index % 2 !== 0 ? 'user' as const : 'assistant' as const
    })
  );

  return [
    initialMessage,
    ...nextMessages
  ];
}

export async function getCompletion(currentState: string, formData: FormData): Promise<string> {
  const messages = formData.getAll('message');
  const validatedMessages = messagesValidator.parse(messages);

  return getCompletionFromModel(validatedMessages); 
}

export async function getCompletionFromModel(messages: string[]): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY, 
  });

  const messagesWithRole = getMessagesWithRole(messages);

  const completion = await openai.chat.completions.create({
    messages: messagesWithRole,
    model: 'gpt-3.5-turbo',
  });

  const message = completion.choices[0].message.content ?? '';

  return message;
}
