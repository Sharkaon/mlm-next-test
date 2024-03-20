'use server';

import OpenAI from "openai";

function getMessagesWithRole(messages: string[]): any[] {
  const initialMessage = {
    content: messages.shift()!,
    role: 'system',
  } as const;

  const nextMessages: Array<{
    content: string,
    role: string
  }> = messages.map(
    (message, index) => ({
      content: message,
      role: index % 2 !== 0 ? 'user' : 'assistant'
    })
  );

  return [
    initialMessage,
    ...nextMessages
  ];
}

export async function getCompletion(currentState: string, formData: FormData): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY, 
  });

  const messages = formData.getAll('message') as string[];

  const messagesWithRole = getMessagesWithRole(messages);

  const completion = await openai.chat.completions.create({
    messages: messagesWithRole,
    model: 'gpt-3.5-turbo',
  });

  const message = completion.choices[0].message.content ?? '';

  return message; 
}
